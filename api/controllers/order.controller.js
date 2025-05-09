import Order from "../models/order.model.js";
import { errorHandler } from "../utils/error.js";

// CREATE ORDER
export const createOrder = async (req, res, next) => {
  try {
    const orderData = {
      ...req.body,
      userId: "6817f4e6c1cf12418221d57d",  // Automatically set userId
      restaurantId: "681815df9d26ea0bc05ce27e",  // Automatically set restaurantId
    };

    const order = new Order(orderData);

    // console.log('Order data:', order);  // Log order data to see the structure

    await order.save();

    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order:', err);  // Log the error
    next(errorHandler(500, "Failed to create order"));
  }
};




// GET ALL ORDERS FOR A USER
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();  // Fetch all orders from DB
    res.status(200).json(orders);  // Return orders to the frontend
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// GET A SINGLE ORDER BY ID
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);  // Find the order by its ID

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Return order details (including userEmail, userName)
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch order data' });
  }
};


// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res, next) => {
  try {
    const validStatuses = [
      "pending",
      "in-progress",
      "ready",
      "canceled",
      "finished",
    ];
    const { status } = req.body;

    if (!validStatuses.includes(status)) {
      return next(errorHandler(400, "Invalid status value"));
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return next(errorHandler(404, "Order not found"));
    res.status(200).json(order);
  } catch (err) {
    next(errorHandler(500, "Failed to update order status"));
  }
};

// DELETE ORDER
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return next(errorHandler(404, "Order not found"));
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    next(errorHandler(500, "Failed to delete order"));
  }
};
