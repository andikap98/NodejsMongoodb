import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js"


dotenv.config();
const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

try {
    await mongoose
        .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(5000))
        .then(() =>
            console.log('Connected TO Database and Listening TO Localhost 5000')
        )
} catch (error) {

}


