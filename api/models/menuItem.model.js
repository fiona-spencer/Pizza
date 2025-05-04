import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
    resturantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resturant',
        required: true
    },
    name: {
        type: String,
        rerquired: true
    },
    price: {
        type: Number,
        required: true
    },
    addOns: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            }
        }
    ],
    dietary: {
        type: String,
        enum: ['veg', 'vegan', 'none'],
        default: 'none'
    },
    category: {
        type: String,
        enum: ['pizza', 'wing', 'side'],
        default: 'pizza',
    },
    notes: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model('MenuItem', MenuItemSchema);