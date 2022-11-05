import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, 
  Dashboard, 
  ListCategory, CreateCategory, EditCategory, 
  ListPost, CreatePost, EditPost, GeneratePost,
  Comment,
  HomeBlog, SingleBlog, SearchBlog, CategoryBlog,   
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Blog */}
        <Route path="/" element={<HomeBlog />} />
        <Route path="/category/:categoryName" element={<CategoryBlog />} />
        <Route path="/search/:keyword" element={<SearchBlog />} />
        <Route path="/post/:slug" element={<SingleBlog />} />
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Category */}
        <Route path="/category" element={<ListCategory />} />
        <Route path="/category/create" element={<CreateCategory />} />
        <Route path="/category/edit/:id" element={<EditCategory />} />
        {/* Post */}
        <Route path="/post" element={<ListPost />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/post/edit/:id" element={<EditPost />} />
        <Route path="/post/generate" element={<GeneratePost />} />
        {/* Comment */}
        <Route path="/comment" element={<Comment />} />
        {/* Login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
