import mongoose from "mongoose";
import BlogModel from "../model/BlogModel.js";
import UserModel from "../model/UserModel.js";

export const getAllBlogs = async (req, res) => {

    try {
        const response = await BlogModel.find();
        if (response.length == 0) {
            return res.status(404).json({ message: "Blog Not Found!!" })
        }
        return res.status(200).json({ data: response.length, response })
    } catch (error) {
        console.log(error)
    }
}

export const getBlogByID = async (req, res) => {
    const id = req.params.id;
    try {
        const idBlogs = await BlogModel.findById(id)
        if (!idBlogs) {
            return res.status(404).json({ message: "Data yang dicari tidak ada" })
        }
        return res.status(200).json({ idBlogs })
    } catch (error) {

    }


}

export const addBlog = async (req, res) => {
    const { title, description, image, user } = req.body;
    const existingUser = await UserModel.findById(user);
    try {
       
        if(!existingUser){
            return res.status(400).json({message:"Unable to find user by this ID"})
        }
    } catch (error) {
        
    }
    try {
        if (description.length <= 20) {
            return res.status(422).json({ message: "Description is too short" });
        }
        const blog = new BlogModel({
            title,
            description,
            image,
            user
        });

        const session =  await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction();
        return res.status(201).json({ message: "Created Blog Successfull" })
    } catch (error) {
        console.error("Error adding blog:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


export const updateBlog = async(req, res, next)=>{
    const {title, description} = req.body;
    const id = req.params.id;


    try {

        if(description.length<=20){
            return res.status(422).json({ message: "Description is too short" });
        }
        const blog = await BlogModel.findByIdAndUpdate(id,{
            title,
            description
        })
        if(!blog){
        return res.status(404).json({message:"Data Blog tidak ditemukan"})
        }
        return res.status(201).json({blog})  
    } catch (error) {
        
    }

}

export const deleteBlog = async(req, res)=>{
    const id = req.params.id
    try {
        const deleteData = await BlogModel.findById(id).populate("user")
        if(!deleteData){
            return res.status(404).json({message:"Data Blog tidak ditemukan"})
        }
        if(deleteData.user){
            await deleteData.user.blogs.pull(deleteData._id)
            await deleteData.user.save()
        }
        await BlogModel.findByIdAndDelete(id)
        return res.status(200).json({ message: "Delete Blog Successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}