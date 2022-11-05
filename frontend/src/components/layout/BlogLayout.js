import React from "react";
import { NavLink } from 'react-router-dom'
import "./../../assets/scss/styles.scss";
import "./../../assets/js/scripts.js";
import Footer from "../landing/Footer";

const BlogLayout = (props) => {
  return (

    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink to="/" className="navbar-brand">Blog</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav> 
        <div className='container'>                
          {props.children}       
        </div>
        <Footer />
    </div>
    
  );
};

export default BlogLayout;
