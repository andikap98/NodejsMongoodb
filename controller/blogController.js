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
    const { title, description, image, user } = req.body
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

        await blog.save();
        return res.status(201).json({ message: "Created Blog Successfull" })
    } catch (error) {
        console.error("Error adding blog:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


export const updateBlog = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    try {
        // Use the correct syntax for findOneAndUpdate
        const blogUpdate = await UserModel.findByIdAndUpdate(id,        // Provide an object with the search criteria
            { title, description },  // Provide an object with the fields to update
            { new: true }  // Use the { new: true } option to return the updated document
        );

        if (!blogUpdate) {
            return res.status(404).json({
                message: 'Data tidak ditemukan'
            });
        }

        return res.status(200).json({ message: 'Update Blog Successful', updatedBlog: blogUpdate });
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};