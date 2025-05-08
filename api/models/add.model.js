import mongoose from "mongoose";

const AddOnSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  available: {
    type: Boolean,
    default: true, // AddOn is available by default
  },
}, { timestamps: true });

export default mongoose.model("AddOn", AddOnSchema);
