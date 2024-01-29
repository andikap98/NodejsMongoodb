import UserModel from "../model/UserModel.js";

export const getAllUser = async (req, res) => {
    let users;

    try {
        users = await UserModel.find()
        if (users.length == 0) {
            return res.status(200).json({ message: "Data users masih kosong" })
        }
        return res.status(200).json({ users })
    } catch (error) {
        console.error(error)
    }
}
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exist!!" })
        }
        const user = new UserModel({
            name,
            email,
            password
        });
        user.save()
        return res.status(201).json({ message: "Created User Successfull" })
    } catch (error) {
        console.error(error)
    }
}