import React, { useState } from 'react';
import axios from 'axios';
import './FeatureList.css';

const ExamSchedule = () => {
    const [department, setDepartment] = useState('');   
    const [courseCount, setCourseCount] = useState(1);  
    const [courses, setCourses] = useState([{ courseCode: '', section: '' }]);
    const [schedule, setSchedule] = useState([]);       
    const [showNotFoundModal, setShowNotFoundModal] = useState(false);

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };

    const handleCourseCountChange = (e) => {
        const count = parseInt(e.target.value, 10);     
        setCourseCount(count);
        setCourses(Array(count).fill({ courseCode: '', section: '' }));
    };

    const handleCourseChange = (index, e) => {
        const { name, value } = e.target;
        const newCourses = [...courses];
        newCourses[index] = { ...newCourses[index], [name]: value };
        setCourses(newCourses);
    };

    const fetchSchedule = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/exam-schedule/schedule', {
                department,
                courses
            });
            
            if (response.data && response.data.length > 0) {
                setSchedule(response.data);
                setShowNotFoundModal(false);
            } else {
                setSchedule([]);
                setShowNotFoundModal(true);
            }
        } catch (error) {
            console.error('Error fetching schedule:', error);
            setSchedule([]);
            setShowNotFoundModal(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSchedule();
    };

    return (
        <div className="feature-form-container" style={{maxWidth: '900px', position: 'relative'}}>        
            <h2 style={{fontSize: '2rem', marginBottom: '10px'}}>Exam Schedule</h2>
            <p style={{color: '#64748b', marginBottom: '32px'}}>Enter your courses to fetch your personalized exam timetable.</p>
            
            <form onSubmit={handleSubmit} style={{display: 'grid', gap: '24px'}}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                    <div className="form-group">
                        <label>Department</label>
                        <select className="input-field" value={department} onChange={handleDepartmentChange} required>
                            <option value="">Select Department</option>
                            <option value="cse">Computer Science (CSE)</option>
                            <option value="eee">Electrical Engineering (EEE)</option>
                            <option value="civil">Civil Engineering</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Number of Courses</label>   
                        <input
                            type="number"
                            className="input-field"
                            value={courseCount}
                            onChange={handleCourseCountChange}
                            min="1"
                            max="10"
                            required
                        />
                    </div>
                </div>

                <div style={{display: 'grid', gap: '16px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0'}}>
                    <h3 style={{fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>Course Details</h3>
                    {courses.map((course, index) => (
                        <div key={index} style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px'}}>
                            <div className="form-group" style={{marginBottom: 0}}>
                                <label style={{fontSize: '0.8rem', color: '#64748b'}}>Course Code {index + 1}</label>
                                <input
                                    type="text"
                                    name="courseCode"       
                                    placeholder="e.g. CSE 1111"
                                    className="input-field" 
                                    style={{marginBottom: 0, padding: '12px'}}
                                    value={course.courseCode}
                                    onChange={(e) => handleCourseChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="form-group" style={{marginBottom: 0}}>
                                <label style={{fontSize: '0.8rem', color: '#64748b'}}>Section</label>
                                <input
                                    type="text"
                                    name="section"
                                    placeholder="e.g. A"
                                    className="input-field" 
                                    style={{marginBottom: 0, padding: '12px'}}
                                    value={course.section}
                                    onChange={(e) => handleCourseChange(index, e)}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn btn-primary" style={{padding: '16px', fontSize: '1rem'}}>
                    ✨ Find Schedule
                </button>
            </form>

            {schedule.length > 0 && (
                <div style={{marginTop: '48px'}}>       
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                        <h3 style={{fontSize: '1.5rem', fontWeight: '800'}}>Your Personalized Schedule</h3>
                        <button className="btn" style={{background: '#fff', border: '1px solid #e2e8f0', fontSize: '0.85rem'}} onClick={() => window.print()}>🖨️ Print</button>
                    </div>
                    <div className="feature-list" style={{display: 'grid', gap: '16px'}}>
                        {schedule.map((exam, index) => (
                            <div key={index} className="feature-card" style={{cursor: 'default', flexDirection: 'row', alignItems: 'center', padding: '24px'}}>
                                <div className="card-icon-circle" style={{width: '64px', height: '64px', borderRadius: '12px', fontSize: '0.9rem', marginBottom: 0, marginRight: '24px', background: '#e0e7ff', color: '#4f46e5', fontWeight: '800'}}>
                                    {exam.course_code}
                                </div>
                                <div className="card-content" style={{flex: 1}}>
                                    <h3 style={{fontSize: '1.2rem', marginBottom: '8px'}}>{exam.course_title}</h3>
                                    <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
                                        <p style={{color: '#475569', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px'}}>
                                            📅 {new Date(exam.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                        <p style={{color: '#475569', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px'}}>
                                            ⏱️ {exam.time}
                                        </p>
                                        <p style={{color: '#475569', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px'}}>
                                            🆔 Section: {exam.section}
                                        </p>
                                    </div>
                                </div>
                                <div style={{background: '#f1f5f9', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', color: '#475569'}}>
                                    {exam.day}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Not Found Modal */}
            {showNotFoundModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white', padding: '40px', borderRadius: '24px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center', maxWidth: '400px', width: '90%'
                    }}>
                        <div style={{fontSize: '3rem', marginBottom: '20px'}}>🔍</div>
                        <h3 style={{fontSize: '1.5rem', fontWeight: '800', marginBottom: '10px'}}>No Schedule Found</h3>
                        <p style={{color: '#64748b', marginBottom: '30px'}}>We couldn't find an exam schedule matching your criteria. Please double-check your inputs.</p>
                        <button className="btn btn-primary" style={{width: '100%'}} onClick={() => setShowNotFoundModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamSchedule;
