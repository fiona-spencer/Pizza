import mongoose from "mongoose";
// Store Schema
const storeSchema = new mongoose.Schema({
  isOpen: {
    type: Boolean,
    required: true,
  },
  openHour: {
    type: Number,
    required: true,
  },
  closeHour: {
    type: Number,
    required: true,
  },
});

// Create and export the model
export default mongoose.model('Store', storeSchema);
