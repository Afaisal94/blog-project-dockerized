import { AdminLayout } from "../../components";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryById, updateCategory } from '../../redux/features/categorySlice'

function EditCategory() {

  let navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => ({
    ...state.category
  }));
  const [name, setName] = useState('')

  const token = localStorage.getItem("token");
    
  useEffect(() => {
    if(!token) {
      navigate('/login');
    }
    dispatch(getCategoryById(id));
  }, [dispatch]);

  useEffect(() => {
    if(categories){
        setName(categories.name)
    }
  }, [categories]);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateCategory({id, name}));
    navigate('/category');
  }

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Edit Category</h1>
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

export default EditCategory;
