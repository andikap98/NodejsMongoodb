import express from "express";
import { getAllBlogs, addBlog, getBlogByID, updateBlog } from "../controller/blogController.js";

const route = express.Router();

route.get('/', getAllBlogs);
route.get('/:id', getBlogByID);
route.post('/add', addBlog);
route.put('/update/:id', updateBlog);


export default route;