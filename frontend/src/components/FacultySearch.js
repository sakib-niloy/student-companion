import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './FeatureList.css';
import NotificationModal from './NotificationModal';

const FacultySearch = () => {
    const [facultyName, setFacultyName] = useState(''); 
    const [facultyList, setFacultyList] = useState([]); 
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [counsellingTimes, setCounsellingTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [notification, setNotification] = useState({ isOpen: false, title: '', message: '' });

    const searchFaculty = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/faculty/search?name=${facultyName}`);   
            const facultyData = response.data.map(facultyMember => ({
                ...facultyMember,
                counselling_times: facultyMember.counselling_times
                    ? (typeof facultyMember.counselling_times === 'string' ? JSON.parse(facultyMember.counselling_times) : facultyMember.counselling_times)
                    : [],
            }));
            setFacultyList(facultyData);
        } catch (error) {
            console.error('Error searching faculty:', error);
        }
    };

    const requestCounselling = async (facultyId) => {   
        try {
            const studentId = getLoggedInStudentId();   
            if (!studentId) {
                setNotification({ isOpen: true, title: 'Attention', message: 'Please sign in first' });
                return;
            }
            if (!selectedTime) {
                setNotification({ isOpen: true, title: 'Attention', message: 'Please select a time slot' });
                return;
            }

            const response = await axios.post('http://localhost:5000/api/counselling/request', {
                studentId: studentId,
                facultyId: facultyId,
                requestedTime: selectedTime,
            });

            setNotification({ isOpen: true, title: 'Success', message: response.data.message });
            setSelectedFaculty(null);
            setSelectedTime('');
        } catch (error) {
            console.error('Error requesting counselling:', error);
            setNotification({ isOpen: true, title: 'Error', message: 'Error requesting counselling.' });
        }
    };

    function getLoggedInStudentId() {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);       
                return decoded.id;
            }
            return null;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    const showCounsellingTimes = (faculty) => {
        setSelectedFaculty(faculty);
        setCounsellingTimes(faculty.counselling_times || []);
    };

    return (
        <div className="feature-form-container" style={{maxWidth: '1000px'}}>
            <h2 style={{fontSize: '2rem', marginBottom: '10px'}}>Faculty Counselling</h2>
            <p style={{color: '#64748b', marginBottom: '32px'}}>Search and book counselling sessions with faculty members.</p>

            <div className="faculty-search-bar" style={{marginBottom: '40px', background: '#fff', border: '1px solid #e2e8f0', padding: '8px 8px 8px 24px', display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '14px'}}>
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search Faculty by Name"
                    value={facultyName}
                    style={{fontSize: '1rem', border: 'none', background: 'transparent', outline: 'none', flex: 1}}
                    onChange={(e) => setFacultyName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchFaculty()}
                />
                <button className="btn btn-primary" style={{padding: '12px 32px'}} onClick={searchFaculty}>Search</button>
            </div>

            <div className="feature-list" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px'}}>
                {facultyList.map((faculty) => (
                    <div key={faculty.id} className="feature-card" style={{padding: '24px', cursor: 'pointer'}} onClick={() => showCounsellingTimes(faculty)}>
                        <div className="card-icon-circle" style={{width: '48px', height: '48px', marginBottom: '16px'}}>👨‍🏫</div>
                        <div className="card-content" style={{flex: 1, width: '100%'}}>
                            <h3 style={{fontSize: '1.1rem', marginBottom: '4px'}}>{faculty.name}</h3>
                            <p style={{color: '#64748b', fontSize: '0.85rem', marginBottom: '16px'}}>{faculty.department || 'Computer Science'}</p>
                            <button className="btn btn-primary" style={{width: '100%', fontSize: '0.85rem', padding: '10px'}}>View Schedule</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedFaculty && (
                <div className="preview-box" style={{marginTop: '40px', border: '1px solid #e0e7ff', background: '#f5f7ff', borderRadius: '24px', padding: '32px'}}>    
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                        <h3 style={{fontSize: '1.25rem', fontWeight: '700'}}>Available Times for {selectedFaculty.name}</h3>
                        <button style={{background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer'}} onClick={() => setSelectedFaculty(null)}>×</button>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px'}}>
                        {counsellingTimes.length > 0 ? counsellingTimes.map((time, index) => (
                            <label key={index} className={`feature-card ${selectedTime === `${time.day_of_week} ${time.start_time}-${time.end_time}` ? 'active' : ''}`} 
                                style={{
                                    padding: '16px 20px',
                                    borderRadius: '16px',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    border: selectedTime === `${time.day_of_week} ${time.start_time}-${time.end_time}` ? '2px solid var(--primary)' : '1px solid #e2e8f0',
                                    background: selectedTime === `${time.day_of_week} ${time.start_time}-${time.end_time}` ? 'white' : '#fff'
                                }}>
                                <input
                                    type="radio"        
                                    style={{display: 'none'}}
                                    value={`${time.day_of_week} ${time.start_time}-${time.end_time}`}
                                    name="counsellingTime"
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                />
                                <div className="card-icon-circle" style={{width: '32px', height: '32px', fontSize: '0.9rem', marginBottom: '0', marginRight: '16px'}}>📅</div>
                                <div className="card-content">
                                    <p style={{fontWeight: '600', fontSize: '0.9rem', color: '#1e293b'}}>{`${time.day_of_week}`}</p>
                                    <p style={{fontSize: '0.8rem', color: '#64748b'}}>{`${time.start_time} - ${time.end_time}`}</p>
                                </div>
                                {selectedTime === `${time.day_of_week} ${time.start_time}-${time.end_time}` && <span style={{marginLeft: 'auto'}}>✅</span>}
                            </label>
                        )) : <p>No available counselling times found.</p>}
                    </div>

                    {counsellingTimes.length > 0 && (   
                        <div style={{display: 'flex', gap: '12px', marginTop: '32px'}}>
                            <button
                                className="btn btn-primary"
                                style={{flex: 2, padding: '14px'}}
                                onClick={() => requestCounselling(selectedFaculty.id)}
                            >
                                Confirm Request
                            </button>
                            <button className="btn" style={{flex: 1, background: '#fff', border: '1px solid #e2e8f0'}} onClick={() => setSelectedFaculty(null)}>Cancel</button>
                        </div>
                    )}
                </div>
            )}
            
            <NotificationModal 
                isOpen={notification.isOpen} 
                title={notification.title} 
                message={notification.message} 
                onClose={() => setNotification({ ...notification, isOpen: false })} 
            />
        </div>
    );
};

export default FacultySearch;
