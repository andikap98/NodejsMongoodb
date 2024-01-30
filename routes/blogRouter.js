import express  from "express";
import { getAllBlogs,addBlog, getBlogByID } from "../controller/blogController";

const route = express.Router();

route.get('/', getAllBlogs);
route.get('/:id', getBlogByID);
route.post('/add', addBlog);


export default route;