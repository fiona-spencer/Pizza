import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';

// ROUTES
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import restaurantRoutes from './routes/restaurant.route.js';
import menuRoutes from './routes/menu.route.js';
import orderRoutes from './routes/order.route.js';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize App
const app = express();

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());


// MongoDB Connection
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// REST API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);

// Stripe Routes
app.get('/api/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; // Extract the amount from the request body

    // Ensure the amount is valid
    if (!amount || amount <= 0) {
      return res.status(400).send({ error: { message: 'Invalid amount' } });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'cad',
      amount: amount,  // Use the dynamic amount (in cents)
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).send({
      error: { message: e.message },
    });
  }
});


// Static File Serving (Frontend)
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
