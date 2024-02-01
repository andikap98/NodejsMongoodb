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
    blogs:[{type: mongoose.Types.ObjectId, ref:"Blog", require:true}]
},{
    timestamps:true
});

userSchema.pre('remove', async(next)=>{
    try {
        await BlogModel.deleteMany({_id:{ $in: this.blogs}})
        next()
    } catch (error) {
        next(error)
    }
})


export default mongoose.model("User", userSchema);
// user
