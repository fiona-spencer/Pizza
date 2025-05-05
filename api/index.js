import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

// ROUTES
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js';
import restaurantRoutes from './routes/restaurant.route.js';
import menuRoutes from './routes/menu.route.js';
import cartRoutes from './routes/cart.route.js';
import orderRoutes from './routes/order.route.js';

dotenv.config();


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.json());  // Ensures that the request body is parsed as JSON
app.use(cookieParser());


// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
