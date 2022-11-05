import { AdminLayout } from "../../components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, deletePost } from "../../redux/features/postSlice";

function ListPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const { isLoading, posts, isError } = useSelector((state) => ({
    ...state.post,
  }));

  const token = localStorage.getItem("token");

  useEffect(() => {
    if(!token) {
      navigate('/login');
    }
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">List Post</h1>
        <ol className="breadcrumb mb-4">
          <Link to={"/post/create"} className="btn btn-success">
            {" "}
            Create{" "}
          </Link>{" "}
          &nbsp;
          <Link to={"/post/generate"} className="btn btn-info">
            {" "}
            Generate Post{" "}
          </Link>
        </ol>
        <div className="row">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Post Date</th>
                <th>Title</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {isLoading && (
                <tr>
                    <td colSpan={5}>
                    {" "}
                    <center> Loading ... </center>
                    </td>
                </tr>
            )}

            {!isLoading && isError ? (        
                <tr>
                    <td colSpan={5}>
                        {" "}
                        <center> {isError} </center>
                    </td>
                </tr>
            ) : null}

            {!isLoading && posts.length ? (
                <>

                {
                posts.map((post, index) => (
                  <tr key={post._id}>
                    <td>{index + 1}</td>
                    <td>
                      {Date(post.createdAt).replace(
                        "GMT+0700 (Western Indonesia Time)",
                        ""
                      )}
                    </td>
                    <td>{post.title}</td>
                    <td>{post.category?.name}</td>
                    <td>
                      <div className="btn-group">
                        <Link
                          to={`/post/${post.slug}`}
                          className="btn btn-secondary"
                          target="_blank"
                        >
                          Preview
                        </Link>
                        <Link
                          to={`/post/edit/${post._id}`}
                          className="btn btn-primary"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => dispatch(deletePost(post._id))}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              </>
            ) : null}

            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ListPost;
