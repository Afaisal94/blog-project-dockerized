import { AdminLayout } from "../../components";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../redux/features/categorySlice'

function CreateCategory() {

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('')

  const token = localStorage.getItem("token");
    
  useEffect(() => {
    if(!token) {
      navigate('/login');
    }
  }, []);

  const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(createCategory({name}));
      navigate('/category');
  }

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Create Category</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active"></li>
        </ol>
        <div className="row">

          <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label>Category Name</label>
                  <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required/>
              </div>
              <br/>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>

        </div>
      </div>
    </AdminLayout>
  );
}

export default CreateCategory;
