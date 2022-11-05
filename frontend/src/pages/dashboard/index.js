import React, { useEffect } from 'react';
import { AdminLayout } from "../../components";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/features/categorySlice'
import { getPosts } from '../../redux/features/postSlice'
import { getComments } from '../../redux/features/commentSlice'

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => ({
    ...state.category,
  }));
  const { posts } = useSelector((state) => ({
    ...state.post,
  }));
  const { comments } = useSelector((state) => ({
    ...state.comment,
  }));
  
  const token = localStorage.getItem("token");  

  useEffect(() => {
    if(!token) {
      navigate('/login');
    }
    dispatch(getCategories());
    dispatch(getPosts());
    dispatch(getComments());

  }, [dispatch]);

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Dashboard</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active"></li>
        </ol>
        <div className="row">
          <div className="col-xl-4 col-md-4">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">You have {categories.length} Categories</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link to={'/category'} className="small text-white stretched-link">
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4">
            <div className="card bg-secondary text-white mb-4">
              <div className="card-body">You have {posts.length} Posts</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link to={'/post'} className="small text-white stretched-link">
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">You have {comments.length} Comments</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link to={'/comment'} className="small text-white stretched-link">
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
