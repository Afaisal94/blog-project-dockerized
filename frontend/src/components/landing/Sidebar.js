import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/features/categorySlice';

function Sidebar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => ({
    ...state.category
  }));
  useEffect(() => {        
    dispatch(getCategories());
  }, []);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${query}`);
    setQuery('')
  };
  return (
    <div className="col-lg-5">
      <div className="card mb-4">
        <div className="card-header">Search</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Search Post"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <input
                className="btn btn-primary"
                id="button-search"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">Categories</div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6">
              <ul className="list-unstyled mb-0">
                {
                  categories.map((c) => {
                    return (
                      <li key={c._id}>
                        <Link to={`/category/${c.name}`}>
                          {c.name}
                        </Link>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
