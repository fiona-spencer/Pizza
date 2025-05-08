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
    itemName: {  // Changed from menuItemId to itemName
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
  }
}, { timestamps: true });

OrderSchema.pre('save', function (next) {
  let subtotal = 0;

  this.items.forEach(item => {
    const addOnTotal = item.addOns?.reduce((sum, addOn) => sum + addOn.price, 0) || 0;
    subtotal += (item.price + addOnTotal) * item.quantity;
  });

  const tax = subtotal * 0.13;
  const totalWithTip = subtotal + this.tip;
  const totalWithTax = totalWithTip + tax;

  this.subtotal = subtotal;
  this.tax = tax;
  this.totalWithTip = totalWithTip;
  this.totalWithTax = totalWithTax;

  next();
});

export default mongoose.model('Order', OrderSchema);
