import { AdminLayout } from "../../components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../redux/features/categorySlice";
import axios from "axios";

function GeneratePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [keyword, setKeyword] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();   
    axios.post('http://localhost:5000/postgenerator', {
        keyword: keyword,
        size: size,
        category: category
    }).then(response => {
      navigate("/post");
    })
    
  };

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Generate Post</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active"></li>
        </ol>
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Keyword</label>
              <input
                type="text"
                className="form-control"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Size</label>
              <select
                className="form-control"
                onChange={(e) => setSize(e.target.value)}
              >
                <option value='10'>10 Posts</option>
                <option value='30'>30 Posts</option>
                <option value='50'>50 Posts</option>
              </select>
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

export default GeneratePost;
