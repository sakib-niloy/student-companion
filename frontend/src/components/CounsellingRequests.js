import React from 'react';
import { jwtDecode } from 'jwt-decode';
import StudentRequests from './StudentRequests';
import FacultyRequests from './FacultyRequests';

const CounsellingRequests = () => {
    const token = localStorage.getItem('token');
    if (!token) return <p>Please sign in.</p>;
    
    const decoded = jwtDecode(token);
    const role = decoded.role; // Assuming role is in the token

    if (role === 'faculty') {
        return <FacultyRequests />;
    } else {
        return <StudentRequests />;
    }
};

export default CounsellingRequests;
