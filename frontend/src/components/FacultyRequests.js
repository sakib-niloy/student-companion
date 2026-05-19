import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import NotificationModal from './NotificationModal';

const FacultyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [notification, setNotification] = useState({ isOpen: false, title: '', message: '' });
    const [error, setError] = useState(null);

    // Fetch requests function
    const fetchRequests = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/counselling/requests`, {
                headers: { Authorization: `Token ${token}` }
            });
            setRequests(response.data);
        } catch (err) {
            console.error('Error fetching requests:', err);        
            setNotification({ isOpen: true, title: 'Error', message: 'Failed to fetch requests' });
        }
    }, []);

    // Fetch requests on component mount
    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleApprove = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/counselling/update-status', { requestId, status: 'approved' }, {
                headers: { Authorization: `Token ${token}` }
            });
            setNotification({ isOpen: true, title: 'Success', message: 'Request approved' });
            fetchRequests(); // Refresh the list
        } catch (err) {
            console.error('Failed to approve request:', err);      
            setNotification({ isOpen: true, title: 'Error', message: 'Failed to approve request' });
        }
    };

    const handleReject = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/counselling/update-status', { requestId, status: 'rejected' }, {
                headers: { Authorization: `Token ${token}` }
            });
            setNotification({ isOpen: true, title: 'Success', message: 'Request rejected' });
            fetchRequests(); // Refresh the list
        } catch (err) {
            console.error('Failed to reject request:', err);       
            setNotification({ isOpen: true, title: 'Error', message: 'Failed to reject request' });
        }
    };

    const renderRequests = (status) => (
        requests
            .filter(request => request.status === status)
            .map(request => (
                <div key={request.id} className="feature-card" style={{padding: '16px', marginBottom: '10px'}}>
                    <p><strong>Student:</strong> {request.student_name}</p>
                    <p><strong>Requested Time:</strong> {request.requested_time}</p>
                    {status === 'pending' && (
                        <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                            <button className="btn btn-primary" onClick={() => handleApprove(request.id)}>Approve</button>
                            <button className="btn" onClick={() => handleReject(request.id)}>Reject</button>
                        </div>
                    )}
                </div>
            ))
    );

    return (
        <div className="feature-form-container">
            <h2>Pending Requests</h2>
            {renderRequests('pending')}

            <h2>Approved Requests</h2>
            {renderRequests('approved')}

            <h2>Rejected Requests</h2>
            {renderRequests('rejected')}
            
            <NotificationModal 
                isOpen={notification.isOpen} 
                title={notification.title} 
                message={notification.message} 
                onClose={() => setNotification({ ...notification, isOpen: false })} 
            />
        </div>
    );
};

export default FacultyRequests;
