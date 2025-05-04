import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false 
    },
    role: {
        type: String,
        enum: [
            'customer',
            'owner',
            'admin'
        ],
        default: 'customer'
    },
    profilePicture: {
        type: String,
        default:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
}, {timestamps: true });

export default mongoose.model('User', UserSchema);