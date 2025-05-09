import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: false,
  },
  items: [{
    itemName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    price: {
      type: Number,
      required: true
    },
    addOns: [{
      name: String,
      price: Number
    }],
    notes: {
      type: String,
      default: ''
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'ready', 'canceled', 'finished'],
    default: 'pending'
  },
  subtotal: {
    type: Number,
    required: true,
    default: 0
  },
  tip: {
    type: Number,
    default: 0
  },
  totalWithTip: {
    type: Number,
    required: true,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  totalWithTax: {
    type: Number,
    required: true,
    default: 0
  },
  pickUpTime: {
    type: Date
  },
  history: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);
