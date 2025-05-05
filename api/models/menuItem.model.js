import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  addOns: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    enum: ["pizza", "wing", "side"],
    default: "pizza",
  },
  notes: {
    type: String,
    maxlength: 300,
  },
  quantity: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });


export default mongoose.model("MenuItem", MenuItemSchema);
