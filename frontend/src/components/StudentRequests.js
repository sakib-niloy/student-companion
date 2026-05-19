import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './FeatureList.css';

const StudentRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const decoded = jwtDecode(token);
                const studentId = decoded.id;
                const response = await axios.get(`http://localhost:5000/api/counselling/my-requests?studentId=${studentId}`, {
                    headers: { Authorization: `Token ${token}` }
                });
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching student requests:', error);
            }
        };
        fetchRequests();
    }, []);

    return (
        <div className="feature-form-container">
            <h2>My Counselling Requests</h2>
            {requests.length > 0 ? (
                <div style={{display: 'grid', gap: '16px'}}>
                    {requests.map(request => (
                        <div key={request.id} className="feature-card" style={{padding: '16px'}}>
                            <p><strong>Faculty:</strong> {request.faculty_name}</p>
                            <p><strong>Time:</strong> {request.requested_time}</p>
                            <p><strong>Status:</strong> <span style={{color: request.status === 'approved' ? 'green' : (request.status === 'rejected' ? 'red' : 'orange')}}>{request.status}</span></p>
                        </div>
                    ))}
                </div>
            ) : <p>No requests found.</p>}
        </div>
    );
};

export default StudentRequests;
