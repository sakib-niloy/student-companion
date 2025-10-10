import React from 'react';
import FacultyRequests from './FacultyRequests';

const FacultyDashboard = () => {
    const facultyId = 1; // Replace with actual faculty ID from authentication

    return (
        <div>
            <h1>Faculty Dashboard</h1>
            <FacultyRequests facultyId={facultyId} />
        </div>
    );
};

export default FacultyDashboard;
