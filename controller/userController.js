import UserModel from "../model/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const getAllUser = async (req, res) => {
    let users;

    try {
        users = await UserModel.find()
        if (users.length == 0) {
            return res.status(200).json({ message: "Data users masih kosong" })
        }
        res.status(200).json({ 
            jumlah_data : users.length,
            users })
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            name,
            email,
            password: hashedPassword
        });
        user.save()
        return res.status(201).json({ message: "Created User Successfull" })
    } catch (error) {
        console.error(error)
    }
}

export const loginUser = async (req, res) =>{
    const {email, password}= req.body;
    const existingUser = await UserModel.findOne({ email });
    try { 
       
        if(!existingUser){
            return res.status(404).json({message: "Email not found!!"})
        }
        
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if(!matchPassword){
            return res.status(404).json({message: "Wrong Password!!"})
        }
        // return res.status(200).json({message: "Login"})
        const {id, name, email} = existingUser
        const token = jwt.sign({userId : id, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        const accessToken = jwt.sign({userId : id, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });

        await UserModel.updateOne({_id:existingUser.id},{$set:{access_token: accessToken}})

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({message: "Welcome", token})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logOutUser = async(req, res)=>{
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken) return res.sendStatus(204)

        const user = await UserModel.find({
            where:{
                access_token: accessToken
            }
        })
        if(!user[0]) return res.sendStatus(204);
        const userId = user[0];
        await UserModel.updateOne({access_token:0},{
            where:{
                _id : userId
            }
        })
        res.clearCookie('accesToken')
        return res.sendStatus(200)
    } catch (error) {
        
    }
}