import React, { useState } from 'react';
import './Login.css';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import axios from 'axios';

const Login = () => {
    const [action, setAction] = useState("Login");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            if (action === "Login") {
                // Make a request to your backend login endpoint
                const response = await axios.post('http://localhost:8080/users/loginUser', {
                    email: formData.email,
                    password: formData.password,
                });
                console.log(response.data);
                // Handle successful login
            } else {
                // Make a request to your backend signup endpoint
                const response = await axios.post('http://localhost:8080/users/addUser', formData);
                console.log(response.data);
                // Handle successful signup
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
                <div className='inputs'>
                    {action === "Login" ? null : (
                        <div className='input'>
                            <img src={email_icon} alt='emailIcon' />
                            <input type='text' placeholder='Name' name='name' value={formData.name} onChange={handleInputChange} />
                        </div>
                    )}

                    <div className='input'>
                        <img src={email_icon} alt='emailIcon' />
                        <input type='email' placeholder='Email' name='email' value={formData.email} onChange={handleInputChange} />
                    </div>

                    <div className='input'>
                        <img src={password_icon} alt='passwordIcon' />
                        <input type='password' placeholder='Password' name='password' value={formData.password} onChange={handleInputChange} />
                    </div>
                </div>

                <div className='sContainer'>
                    <div className='submit' onClick={handleSubmit}>
                        {action}
                    </div>
                    <div className='submit' onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}>
                        {action === "Login" ? "Sign Up" : "Login"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
