import React from 'react'
import { FaRegUser } from "react-icons/fa"; //first name icon
import { FaRegUserCircle } from "react-icons/fa"; // last name icon
import { MdOutlineEmail } from "react-icons/md"; // email  icon
import { FaEyeSlash } from "react-icons/fa"; // hide password icon
import { Link } from 'react-router-dom';
import './signup.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState("")
    const [record, setRecord] = useState("")
    const navigate = useNavigate("")

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!firstName || !lastName || !email || !password) {
            toast.error("All field is required!");
            return false;
        }

        let obj = {
            id: Math.floor(Math.random() * 10000),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        try {
            const response = await axios.post("http://localhost:3000/users", obj);
            const all = [...record, response.data];
            setRecord(all);
            toast.success("User register sucessfully!");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("")
            navigate('/login')
        }
        catch (err) {
            console.log(err);
            return false;
        }
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);
        
    }

  return (
    <>
        <div className='register'>
            <div className="container">
                <div className="col-lg-4 bg-light p-5 register-form mx-auto">
                    <form onSubmit={handleSubmit}>
                        <h4 className='text-center mb-5'>Sign Up</h4>
                        <div className="mb-3 d-flex align-items-center">
                            <span><FaRegUser /></span>
                            <input type="text" placeholder='First Name...' className="form-control f-name" onChange={(e) => setFirstName(e.target.value)} value={firstName || ""}  />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <span><FaRegUserCircle /></span>
                            <input type="text" placeholder='Last Name...' className="form-control" onChange={(e) => setLastName(e.target.value)} value={lastName || ""}  />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <span><MdOutlineEmail /></span>
                            <input type="email" placeholder='Email...' className="form-control" onChange={(e) => setEmail(e.target.value)} value={email || ""}  />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <span><FaEyeSlash /></span>
                            <input type="password" placeholder='Password...' className="form-control" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
                        </div>
                        <div className="mb-2 register-btn d-flex justify-content-center">
                            <button type="submit" className="btn rounded-pill mt-4 w-100">Register Now</button>
                        </div>
                        <div className="mb-3 login-btn d-flex justify-content-center">
                            <span>Already have an account? <Link className='linkRegister' to={'/login'}>Login now</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signup
