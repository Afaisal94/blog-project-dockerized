import { AdminLayout } from "../../components";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../redux/features/categorySlice";
import { getPostById, updatePost } from "../../redux/features/postSlice";
import { Editor } from "@tinymce/tinymce-react";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();  

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [preview, setPreview] = useState("");

  const { posts } = useSelector((state) => ({
    ...state.post
  }));
  const { categories } = useSelector((state) => ({
    ...state.category
  }));

  const token = localStorage.getItem("token");

  useEffect(() => {
    if(!token) {
      navigate('/login');
    }
    dispatch(getCategories());
    dispatch(getPostById(id));
  }, [dispatch]);

  
  const loadImage = (e) => {
    const img = e.target.files[0];
    setImage(img);
    setPreview(URL.createObjectURL(img));
  };

  useEffect(() => {
    if (posts) {
      setTitle(posts.title);
      setContent(posts.content);
      setDescription(posts.description);   
      setCategory(posts.category?._id);
      setCategoryName(posts.category?.name);
      setPreview(posts.image); 
    }
  }, [posts]);

  const handleChange = (content, editor) => {
    setContent(content);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); 
    dispatch(updatePost({ id, title, content, description, image, category }));
    navigate("/post");
    
  }; 

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Edit Post</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active"></li>
        </ol>
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={category}>{categoryName}</option>
                {
                  categories.map((c) => (
                    <option value={c._id}>{c.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group">
              <label>Content</label>
              
              <Editor
                  apiKey="iwmuala1e6yzv3l6kd4j7dukn0esq2uo27eyinmxxyqzcogb"
                  value={content}
                  init={{
                    menubar: false
                  }}
                  onEditorChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                className="form-control"
                onChange={loadImage}
              />
            </div>

            {preview ? (
              <figure className="image is-128x128">
                <img src={preview} alt="thumbnail" />
              </figure>
            ) : (
              ""
            )}

            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default EditPost;
