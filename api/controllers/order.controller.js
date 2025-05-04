import Order from "../models/order.model.js";
import { errorHandler } from "../utils/error.js";

// CREATE ORDER
export const createOrder = async (req, res, next) => {
  try {
    const order = new Order({ ...req.body, userId: req.user.id });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(errorHandler(500, "Failed to create order"));
  }
};

// GET ALL ORDERS FOR USER
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    if (!orders.length) return next(errorHandler(404, "No orders found"));
    res.status(200).json(orders);
  } catch (err) {
    next(errorHandler(500, "Failed to fetch orders"));
  }
};

// GET ORDER BY ID
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return next(errorHandler(404, "Order not found"));
    res.status(200).json(order);
  } catch (err) {
    next(errorHandler(500, "Failed to fetch order"));
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res, next) => {
  try {
    const validStatuses = ["pending", "confirmed", "delivered", "canceled"];
    const { status } = req.body;

    if (!validStatuses.includes(status)) {
      return next(errorHandler(400, "Invalid status value"));
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id, // make sure this matches your route param (e.g., :od if using /order/:od/status)
      { status },
      { new: true }
    );

    if (!order) return next(errorHandler(404, "Order not found"));
    res.status(200).json(order);
  } catch (err) {
    next(errorHandler(500, "Failed to update order status"));
  }
};
