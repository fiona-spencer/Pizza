import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
          menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
          quantity: { type: Number, default: 1 }
        }
      ]
}, { timestamps: true });

export default mongoose.model('Cart', CartSchema);