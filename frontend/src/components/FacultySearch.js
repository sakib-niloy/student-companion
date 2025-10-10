import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';



const FacultySearch = () => {
    const [facultyName, setFacultyName] = useState('');
    const [facultyList, setFacultyList] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [counsellingTimes, setCounsellingTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');

    // Function to search faculty by name
    const searchFaculty = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/faculty/search?name=${facultyName}`);
            const facultyData = response.data.map(facultyMember => ({
                ...facultyMember,
                counselling_times: facultyMember.counselling_times
                    ? JSON.parse(facultyMember.counselling_times)
                    : [], 
            }));
            setFacultyList(facultyData);
        } catch (error) {
            console.error('Error searching faculty:', error);
        }
    };

    // Function to request counselling with selected time
    const requestCounselling = async (facultyId) => {
        console.log("Selected Time:", selectedTime);
    
        try {
            const studentId = getLoggedInStudentId();
            if (!studentId) {
                console.error('Student ID not found');
                return;
            }
    
            console.log("Student ID:", studentId);
            console.log("Faculty ID:", facultyId);
            console.log("Sending POST request to API...");
    
            const response = await axios.post('http://localhost:5000/api/counselling/request', {
                studentId: studentId,
                facultyId: facultyId,
                requestedTime: selectedTime,
            });
    
            console.log("Response:", response.data);  
            alert(response.data.message);
        } catch (error) {
            console.error('Error requesting counselling:', error);
            if (error.response) {
                console.error("Server responded with a status code:", error.response.status);
                console.error("Response Data:", error.response.data);
            } else {
                console.error("Request failed without a response from the server");
            }
        }
    };
    
    // Function to get the logged-in student's ID from the JWT token
    function getLoggedInStudentId() {
        try {
            const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
            if (token) {
                const decoded = jwtDecode(token); // Decode the JWT token
                console.log('Decoded Token:', decoded); // Log the decoded token to check its structure
                return decoded.id; // Use 'id' from the token
            } else {
                console.error('Token not found');
                return null;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
    
    // Function to display available counselling times for a selected faculty member
    const showCounsellingTimes = (faculty) => {
        setSelectedFaculty(faculty);
        setCounsellingTimes(faculty.counselling_times || []);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search Faculty by Name"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
            />
            <button onClick={searchFaculty}>Search</button>

            {facultyList.map((faculty) => (
                <div key={faculty.id}>
                    <h3>{faculty.name}</h3>
                    <button onClick={() => showCounsellingTimes(faculty)}>Request Counselling</button>
                </div>
            ))}

            {selectedFaculty && (
                <div>
                    <h2>Available Counselling Times for {selectedFaculty.name}</h2>
                    {counsellingTimes.map((time, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                value={`${time.day_of_week} ${time.start_time}-${time.end_time}`}
                                name="counsellingTime"
                                onChange={(e) => setSelectedTime(e.target.value)}
                            />
                            <label>{`${time.day_of_week}: ${time.start_time} - ${time.end_time}`}</label>
                        </div>
                    ))}
                    <button onClick={() => requestCounselling(selectedFaculty.id)}>Submit Request</button>
                </div>
            )}
        </div>
    );
};

export default FacultySearch;
