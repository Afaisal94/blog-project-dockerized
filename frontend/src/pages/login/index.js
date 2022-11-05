import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthLayout } from "../../components";

function Login() {

  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //define state validation
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      //check token
      if(localStorage.getItem('token')) {
          //redirect page dashboard
          navigate('/dashboard');
      }
  }, []);

  const loginHandler = async (e) => {
      e.preventDefault();
      
      const formData = new URLSearchParams();
      //append data to formData
      formData.append('email', email);
      formData.append('password', password);
      //send data to server
      await axios.post('http://localhost:5000/auth/login', formData)
      .then((response) => {
          //set token on localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name', response.data.user.name);
          //redirect to dashboard
          navigate('/dashboard');
      })
      .catch((error) => {
          //assign error to state "validation"
          setValidation(error.response.data);
      })
  };

  return (
    <div>
      <AuthLayout>
        <div className="card-header bg-primary">
          <h3 className="text-center font-weight-light my-4">Login</h3>
        </div>
        <div className="card-body">
        {
            validation.message && (
                <div className="alert alert-danger">
                    {validation.message}
                </div>
            )
        }
          <form onSubmit={loginHandler}>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="email"
                placeholder="admin@email.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
              <label for="inputEmail">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="password"
                placeholder="admin"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <label for="inputPassword">Password</label>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
              <a className="small" href="#">
                Forgot Password?
              </a>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
}

export default Login;
