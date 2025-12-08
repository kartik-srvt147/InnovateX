import Blog from "../models/blog.model.js";
import cloudinary from "../lib/cloudinary.js";
import {encode} from "entities"

export const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let featuredImage = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "BloggR", resource_type: "auto" })
        .catch((error) => {
          console.log("Error in uploading image file", error.message);
          res.status(500).json({ message: "Internal server error" });
        });

      featuredImage = uploadResult.secure_url;
    }

    const blog = new Blog({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featuredImage: featuredImage,
      blogContent: encode(data.blogContent),
    });

    await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    console.log("Error in addBlog controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editBlog = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error in editBlog controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateBlog = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error in updateBlog controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteBlog = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error in deleteBlog controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const showAllBlogs = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error in showAllBlogs controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
