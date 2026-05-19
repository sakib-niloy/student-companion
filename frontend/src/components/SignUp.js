import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Auth.css';
import NotificationModal from './NotificationModal';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'student',
        name: ''
    });
    const [notification, setNotification] = useState({ isOpen: false, title: '', message: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
            setNotification({ isOpen: true, title: 'Success', message: response.data.message });
        } catch (error) {
            console.error('Error signing up:', error);  
            setNotification({ isOpen: true, title: 'Error', message: 'Error during signup. Please try again.' });
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
                        <label>Full Name</label>        
                        <input
                            type="text"
                            name="name"
                            className="input-field"     
                            value={formData.name}       
                            onChange={handleChange}     
                            required
                        />
                    </div>
                    <div className="form-group">        
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            className="input-field"     
                            value={formData.username}   
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                    <div className="form-group">        
                        <label>Role</label>
                        <select
                            name="role"
                            className="input-field"     
                            value={formData.role}       
                            onChange={handleChange}     
                        >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary auth-btn">Sign Up</button>
                </form>
                <div className="auth-footer">
                    <Link to="/sign-in" className="home-btn">HOME</Link>
                    <p>Already have an account? <Link to="/sign-in">Sign In</Link></p>
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

export default SignUp;
