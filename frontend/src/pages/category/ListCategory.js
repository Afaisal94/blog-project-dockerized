import { AdminLayout } from "../../components";
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, deleteCategory } from '../../redux/features/categorySlice'

function ListCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, categories, isError } = useSelector((state) => ({
        ...state.category,
    }));

    const token = localStorage.getItem("token");    
    
    useEffect(() => {  
        if(!token) {
            navigate('/login');
        }     
        dispatch(getCategories());
    }, [dispatch]);    

    return (
        <AdminLayout>
        <div className="container-fluid px-4">
            <h1 className="mt-4">List Category</h1>
            <ol className="breadcrumb mb-4">
                <Link to={'/category/create'} className="btn btn-success"> Create </Link>
            </ol>
            <div className="row">        

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Category Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    {isLoading && (
                        <tr>
                            <td colSpan={3}>
                            {" "}
                            <center> Loading ... </center>
                            </td>
                        </tr>
                    )}

                    {!isLoading && isError ? (        
                        <tr>
                            <td colSpan={3}>
                                {" "}
                                <center> {isError} </center>
                            </td>
                        </tr>
                    ) : null}

                    {!isLoading && categories.length ? (
                        <>

                        {
                            categories.map((category, index) => (
                                <tr key={category._id}>
                                    <td>{index+1}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link to={`/category/edit/${category._id}`} className="btn btn-primary">
                                                Edit
                                            </Link>
                                            <button onClick={() => dispatch(deleteCategory(category._id))} className="btn btn-danger">
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

export default ListCategory;
