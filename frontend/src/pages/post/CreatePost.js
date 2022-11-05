import { AdminLayout } from "../../components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../redux/features/categorySlice";
import { createPost } from "../../redux/features/postSlice";
import { Editor } from "@tinymce/tinymce-react";

function CreatePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState("");

  const { categories } = useSelector((state) => ({
    ...state.category,
  }));

  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if(!token) {
      navigate('/login');
    }
    dispatch(getCategories());
  }, [dispatch]);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
    setPreview(URL.createObjectURL(image));
  };
  
  const handleChange = (content, editor) => {
    setContent(content);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // setContent(editorRef.current.getContent());
    console.log(content)
    dispatch(createPost({ title, content, image, description, category }));
    navigate("/post");
  };

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Create Post</h1>
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
                <option value=''>Select Category</option>
                {
                    categories.map((category) => (
                    <option value={category._id}>{category.name}</option>
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
                required
              />
            </div>

            {
                preview ? (
                    <figure className="image is-128x128">
                        <img src={preview} />
                    </figure>
                ) : (
                    ""
                )
            }

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

export default CreatePost;
