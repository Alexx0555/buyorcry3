import React, { useState } from 'react';
import axios from 'axios';

import './LoginSignup.css';
const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        console.log("Login function executed", formData);
        try {
            const response = await axios.post('http://localhost:4000/login', formData);
            if (response.data.success) {
                localStorage.setItem('auth-token', response.data.token);
                console.log("Signup: Token stored in local storage:", response.data.token);
                localStorage.setItem('isAdmin', response.data.isAdmin);
                window.location.replace("/");
            } else {
                alert(response.data.errors);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login.");
        }
    };

    const signup = async () => {
        console.log("Signup function executed", formData);
        try {
            const response = await axios.post('http://localhost:4000/signup', formData);
            if (response.data.success) {
                localStorage.setItem('auth-token', response.data.token);
                console.log("Login: Token stored in local storage:", response.data.token);
                localStorage.setItem('isAdmin', response.data.isAdmin);
                window.location.replace("/");
            } else {
                alert(response.data.errors);
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred during signup.");
        }
    };


    return (
        <div className='login-signup'>
            <div className='login-signup-container'>
                <h1 >{state}</h1>
                <div className='login-signup-fields'>
                    {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
                {state === "Sign Up" ?
                    <p >Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p> :
                    <p>Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
            </div>
        </div>
    );
};

export default LoginSignup;
