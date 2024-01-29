import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import router from "./routes/userRouter.js";


dotenv.config();
const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/users', router)

try {
    await mongoose
        .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(5000))
        .then(() =>
            console.log('Connected TO Database and Listening TO Localhost 5000')
        )
} catch (error) {

}


