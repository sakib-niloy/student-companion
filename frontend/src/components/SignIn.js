import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import NotificationModal from './NotificationModal';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [notification, setNotification] = useState({ isOpen: false, title: '', message: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            navigate('/main-page');
        } catch (error) {
            console.error('Error signing in:', error);  
            setNotification({ isOpen: true, title: 'Error', message: 'Incorrect email or password' });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-background">
                <div className="diagonal-accent top-left"></div>
                <div className="diagonal-accent bottom-right"></div>
            </div>
            <div className="auth-card">
                <div className="auth-header">
                    <div className="logo-circle large">SC</div>
                    <h1>Student Companion</h1>
                </div>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input-field"     
                            value={formData.email}      
                            onChange={handleChange}     
                            required
                        />
                    </div>
                    <div className="form-group">        
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input-field"     
                            value={formData.password}   
                            onChange={handleChange}     
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary auth-btn">Sign In</button>
                </form>
                <div className="auth-footer">
                    <Link to="/" className="home-btn">HOME</Link>
                    <p>Don't have an account? <Link to="/">Sign Up</Link></p>
                </div>
            </div>
            
            <NotificationModal 
                isOpen={notification.isOpen} 
                title={notification.title} 
                message={notification.message} 
                onClose={() => setNotification({ ...notification, isOpen: false })} 
            />
        </div>
    );
};

export default SignIn;
