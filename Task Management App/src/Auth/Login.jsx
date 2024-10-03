import React from 'react'
import { MdOutlineEmail } from "react-icons/md"; // email  icon
import { FaEyeSlash } from "react-icons/fa"; // hide password icon
import { Link } from 'react-router-dom';
import './signup.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate("")

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            toast.error("All field is required!");
            return false;
        }

        try {
            const response = await axios.get("http://localhost:3000/users");
            const all = response.data;
            const user = all.find(user => user.email === email && user.password === password);
            if (user) {
                toast.success('User login Sucessfully!');
                navigate('/taskmanager')
            }
            else {
                toast.error('Invalid Email Or Password!');
            }
            setEmail("");
            setPassword("");
        }
        catch (err) {
            console.log(err);
            return false;
        }     
    }

  return (
    <>
    <div className='register'>
        <div className="container">
            <div className="col-lg-4 bg-light p-5 register-form mx-auto">
                <form onSubmit={handleSubmit}>
                    <h4 className='text-center mb-5'>Login</h4>
                    <div className="mb-3 d-flex align-items-center">
                        <span><MdOutlineEmail /></span>
                        <input type="email" placeholder='Email...' className="form-control" onChange={(e) => setEmail(e.target.value)} value={email || ""}  />
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <span><FaEyeSlash /></span>
                        <input type="password" placeholder='Password...' className="form-control" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
                    </div>
                        <div className="mb-3 login-btn d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary rounded-pill mt-4 w-100">Login Now</button>
                        </div>
                        <div className="mb-3 login-btn d-flex justify-content-center">
                            <span>Don't have an account? <Link className='linkLogin' to={'/'}>Signup now</Link></span>
                        </div>
                </form>
            </div>
        </div>
    </div>
</>
  )
}

export default Login
