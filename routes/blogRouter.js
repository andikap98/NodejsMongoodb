import express from "express";
import { getAllBlogs, addBlog, getBlogByID, updateBlog, deleteBlog } from "../controller/blogController.js";

const route = express.Router();

route.get("/", getAllBlogs);
route.get("/:id", getBlogByID);
route.post("/add", addBlog);
route.patch("/edit/:id", updateBlog);
route.delete("/:id", deleteBlog)


export default route;