import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const FacultyRequests = ({ facultyId }) => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);

    // Fetch requests function
    const fetchRequests = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/counselling/requests/${facultyId}`);
            setRequests(response.data);
        } catch (err) {
            console.error('Error fetching requests:', err);
            if (err.response) {
                console.error('Error Response Status:', err.response.status);
                console.error('Error Response Data:', err.response.data);
            }
            setError('Failed to fetch requests');
        }
    }, [facultyId]);

    // Fetch requests on facultyId change
    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleApprove = async (requestId) => {
        try {
            await axios.post('http://localhost:5000/api/counselling/requests/approve', { requestId });
            fetchRequests(); // Refresh the list
        } catch (err) {
            console.error('Failed to approve request:', err);
        }
    };

    const handleReject = async (requestId) => {
        try {
            await axios.post('http://localhost:5000/api/counselling/requests/reject', { requestId });
            fetchRequests(); // Refresh the list
        } catch (err) {
            console.error('Failed to reject request:', err);
        }
    };

    const renderRequests = (status) => (
        requests
            .filter(request => request.status === status)
            .map(request => (
                <div key={request.id}>
                    <p>Student: {request.student_name}</p>
                    <p>Requested Time: {request.requested_time}</p>
                    {status === 'pending' && (
                        <>
                            <button onClick={() => handleApprove(request.id)}>Approve</button>
                            <button onClick={() => handleReject(request.id)}>Reject</button>
                        </>
                    )}
                </div>
            ))
    );

    return (
        <div>
            <h2>Pending Requests</h2>
            {renderRequests('pending')}

            <h2>Approved Requests</h2>
            {renderRequests('approved')}

            <h2>Rejected Requests</h2>
            {renderRequests('rejected')}

            {error && <p>{error}</p>}
        </div>
    );
};

export default FacultyRequests;
