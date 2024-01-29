import mongoose from 'mongoose';


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
    },
    access_token: {
        type: String,
        default: null,
    },
    
},{
    timestamps:true
});


export default mongoose.model("User", userSchema);
// user
