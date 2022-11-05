import { AdminLayout } from "../../components";
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getComments, deleteComment } from '../../redux/features/commentSlice'

function ListComment() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, comments, isError } = useSelector((state) => ({
        ...state.comment,
    }));

    const token = localStorage.getItem("token");
    
    useEffect(() => {
        if(!token) {
            navigate('/login');
        }
        dispatch(getComments());        
    }, [dispatch]);

    return (
        <AdminLayout>
        <div className="container-fluid px-4">
            <h1 className="mt-4">List Comment</h1>
            <ol className="breadcrumb mb-4">
            </ol>
            <div className="row">        

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Comment</th>
                            <th>Post Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan={4}>
                            {" "}
                            <center> Loading ... </center>
                            </td>
                        </tr>
                    )}

                    {!isLoading && isError ? (        
                        <tr>
                            <td colSpan={4}>
                                {" "}
                                <center> {isError} </center>
                            </td>
                        </tr>
                    ) : null}

                    {!isLoading && comments.length ? (
                        <>

                        
                        {
                            comments.map((comment, index) => (
                                <tr key={comment._id}>
                                    <td>{index+1}</td>
                                    <td>{comment.comment}</td>
                                    <td>{comment.post.title}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button onClick={() => dispatch(deleteComment(comment._id))} className="btn btn-danger">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                        </>
                    ) : null}
                    </tbody>
                </table>

            </div>
        </div>
        </AdminLayout>
    );
}

export default ListComment;
