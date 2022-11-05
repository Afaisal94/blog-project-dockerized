import { BlogLayout, Header, Sidebar } from "../../components";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../redux/features/postSlice';

function HomeBlog() {
  const dispatch = useDispatch();
  const { isLoading, posts, isError } = useSelector((state) => ({
    ...state.post,
  }));
  useEffect(() => {        
    dispatch(getPosts());
  }, [dispatch]);
  
  return (
    <div>
      <BlogLayout>
        <Header title={"Blog Home"} tagline={"Blog created by react js"} />
        {/* Page content */}
        <div className="container">
          <div className="row">
            {/* Blog entries */}
            <div className="col-lg-7">
              {/* Featured blog post */}

              {isLoading && (
                  <center> Loading ... </center>
              )}

              {!isLoading && isError ? (        
                  <center> {isError} </center>
              ) : null}

              {!isLoading && posts.length ? (
                  <>
                  {
                    posts.map((post) => (
                      <div className="card mb-4" key={post._id}>
                        <img
                          className="card-img-top"
                          src={post.image}                  
                          alt={post.title}
                        />
                        <div className="card-body">
                          <div className="small text-muted">{post.createAt}</div>
                          <h2 className="card-title">{post.title}</h2>
                          <p className="card-text" >{post.description}</p>
                          <NavLink to={`/post/${post.slug}`} className="btn btn-primary">
                            Read more →
                          </NavLink>
                        </div>
                      </div>
                    ))
                  }
                  </>
              ) : null}
            </div>
            <Sidebar />
          </div>
        </div>
      </BlogLayout>
    </div>
  );
}

export default HomeBlog;
