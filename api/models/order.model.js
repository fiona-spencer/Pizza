import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    items: [{
        menuItemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuItem'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'ready', 'canceled', 'finished'],
        default: 'pending'
    },
    totalPrice: {
        type: Number
    },
    totalPriceAfterTax: {
        type: Number
    },
    pickUpTime: {
        type: Date
    }

}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);

