import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Index from "./pages/Index";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Profile from "./pages/Profile";
import AddCategory from "./pages/Category/AddCategory";
import CategoryDetails from "./pages/Category/CategoryDetails";
import EditCategory from "./pages/Category/EditCategory";
import BlogDetails from "./pages/Blog/BlogDetails";
import AddBlog from "./pages/Blog/AddBlog";
import EditBlog from "./pages/Blog/EditBlog";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/profile" element={<Profile />} />

          {/* Blog Routes */}
          <Route path="/blog" element={<BlogDetails />} />
          <Route path="/blog/add" element={<AddBlog />} />
          <Route path="/blog/edit/:blog_id" element={<EditBlog />} />

          {/* Category routes */}
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/categories" element={<CategoryDetails />} />
          <Route
            path="/category/edit/:category_id"
            element={<EditCategory />}
          />
        </Route>
        <Route path="/login" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
