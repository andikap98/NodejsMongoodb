import mongoose from 'mongoose';
import hashedPasswordMiddleware from '../middleware/hashedPassword.js';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
    }
});

userSchema.pre('save', hashedPasswordMiddleware)
export default mongoose.model("User", userSchema);
// user
