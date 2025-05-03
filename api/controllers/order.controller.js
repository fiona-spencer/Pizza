import Order from '../models/order.model.js';
import { errorHandler } from '../utils/error.js';

// @desc    Get all orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (err) {
    next(errorHandler(500, 'Failed to retrieve orders.'));
  }
};

// @desc    Get order(s) by user email
export const getOrdersByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    if (!email) return next(errorHandler(400, 'Email is required.'));

    const orders = await Order.find({ email }).sort({ orderDate: -1 });

    if (!orders.length) return next(errorHandler(404, 'No orders found for this email.'));

    res.status(200).json(orders);
  } catch (err) {
    next(errorHandler(500, 'Failed to get orders by email.'));
  }
};

// @desc    Create a new order (Requires authentication)
export const createOrder = async (req, res, next) => {
  try {
    const userEmail = req.user.email;

    const orderData = {
      ...req.body,
      email: userEmail, // override to ensure token matches
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    next(errorHandler(500, 'Failed to create order.'));
  }
};

// @desc    Update an order by ID
export const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedOrder) return next(errorHandler(404, 'Order not found.'));

    res.status(200).json(updatedOrder);
  } catch (err) {
    next(errorHandler(500, 'Failed to update order.'));
  }
};

// @desc    Delete an order by ID
export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) return next(errorHandler(404, 'Order not found.'));

    res.status(200).json({ message: 'Order deleted successfully.' });
  } catch (err) {
    next(errorHandler(500, 'Failed to delete order.'));
  }
};
