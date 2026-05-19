import React, { useState } from 'react';
import axios from 'axios';
import './FeatureList.css';
import NotificationModal from './NotificationModal';

const RoutineGenerator = () => {
    const [courseCount, setCourseCount] = useState(0);  
    const [courseCodes, setCourseCodes] = useState([]); 
    const [routines, setRoutines] = useState([]);       
    const [notification, setNotification] = useState({ isOpen: false, title: '', message: '' });

    const handleCourseCountChange = (e) => {
        const count = parseInt(e.target.value, 10);     
        setCourseCount(count);
        setCourseCodes(Array(count).fill(''));
    };

    const handleCourseCodeChange = (index, e) => {      
        const newCourseCodes = [...courseCodes];        
        newCourseCodes[index] = e.target.value;
        setCourseCodes(newCourseCodes);
    };

    const generateRoutines = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/courses/get-courses', {
                courseCodes,
            });
            const courses = response.data;
            const generatedRoutines = generateNonConflictingRoutines(courses, courseCount);
            setRoutines(generatedRoutines);
        } catch (error) {
            console.error('Error generating routines:', error);
            setNotification({ isOpen: true, title: 'Error', message: 'Error generating routines. Please check your course codes.' });
        }
    };

    const generateNonConflictingRoutines = (courses, requiredCount) => {
        const parseTime = (timeString) => {
            const [start, end] = timeString.split('-').map(time => time.trim());
            return { start, end };
        };

        const isConflict = (courseA, courseB) => {      
            const timeA = parseTime(courseA.time);      
            const timeB = parseTime(courseB.time);      
            const startA = new Date(`1970/01/01 ${timeA.start}`);
            const endA = new Date(`1970/01/01 ${timeA.end}`);
            const startB = new Date(`1970/01/01 ${timeB.start}`);
            const endB = new Date(`1970/01/01 ${timeB.end}`);
            return (startA < endB && endA > startB) && (courseA.day === courseB.day);
        };

        const generateCombinations = (arr, count) => {  
            const result = [];
            const f = (prefix, arr) => {
                for (let i = 0; i < arr.length; i++) {  
                    const newPrefix = prefix.concat(arr[i]);
                    if (newPrefix.length === count) {   
                        result.push(newPrefix);
                    } else {
                        f(newPrefix, arr.slice(i + 1)); 
                    }
                }
            };
            f([], arr);
            return result;
        };

        const filterNonConflictingRoutines = (combinations) => {
            return combinations.filter(routine => {     
                const uniqueCourses = new Set(routine.map(course => course.course_code));
                if (uniqueCourses.size !== routine.length) return false;
                for (let i = 0; i < routine.length; i++) {
                    for (let j = i + 1; j < routine.length; j++) {
                        if (isConflict(routine[i], routine[j])) return false;
                    }
                }
                return true;
            });
        };

        const courseCombinations = generateCombinations(courses, requiredCount);
        return filterNonConflictingRoutines(courseCombinations);
    };


    return (
        <div className="feature-form-container" style={{maxWidth: '1000px'}}>        
            <h2 style={{fontSize: '2rem', marginBottom: '10px'}}>Routine Generator</h2>
            <p style={{color: '#64748b', marginBottom: '32px'}}>Automatically generate non-conflicting schedules based on your chosen courses.</p>
            
            <div style={{background: '#f8fafc', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '40px'}}>
                <div className="form-group" style={{maxWidth: '400px'}}>
                    <label>How many courses do you want to take?</label>
                    <input
                        type="number"
                        className="input-field"
                        value={courseCount}
                        onChange={handleCourseCountChange}  
                        min="1"
                        max="8"
                    />
                </div>

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '24px'}}>
                    {Array.from({ length: courseCount }).map((_, index) => (
                        <div key={index} className="form-group" style={{marginBottom: 0}}>
                            <label style={{fontSize: '0.8rem', color: '#64748b'}}>Course Code {index + 1}</label>
                            <input
                                type="text"
                                className="input-field"
                                style={{marginBottom: 0}}
                                value={courseCodes[index] || ''}
                                onChange={(e) => handleCourseCodeChange(index, e)}
                                placeholder="e.g. CSE1111"        
                            />
                        </div>
                    ))}
                </div>

                {courseCount > 0 && (
                    <button className="btn btn-primary" style={{marginTop: '32px', padding: '16px 40px'}} onClick={generateRoutines}>
                        🚀 Generate Schedules
                    </button>
                )}
            </div>

            <div style={{marginTop: '40px'}}>
                {routines.length > 0 && (
                    <div style={{marginBottom: '24px'}}>
                        <h3 style={{fontSize: '1.5rem', fontWeight: '800'}}>Generated Routines</h3>
                        <p style={{color: '#64748b'}}>We found {routines.length} non-conflicting combinations for you.</p>
                    </div>
                )}
                
                <div style={{display: 'grid', gap: '32px'}}>
                    {routines.map((routine, index) => ( 
                        <div key={index} className="card" style={{padding: '32px', border: '1px solid #e0e7ff', background: '#fff'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                                <h4 style={{fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)'}}>Option {index + 1}</h4>
                                <div style={{background: '#f0fdf4', color: '#16a34a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700'}}>NO CONFLICTS</div>
                            </div>
                            
                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px'}}>
                                {routine.map((course, i) => (
                                    <div key={i} className="feature-card" style={{padding: '20px', borderRadius: '16px', cursor: 'default', background: '#f8fafc'}}>
                                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '12px'}}>
                                            <div className="card-icon-circle" style={{width: '40px', height: '40px', borderRadius: '10px', fontSize: '0.75rem', marginBottom: 0, marginRight: '12px', background: 'white', border: '1px solid #e2e8f0', color: '#1e293b', fontWeight: '700'}}>
                                                {course.course_code}
                                            </div>
                                            <h5 style={{fontSize: '0.95rem', fontWeight: '700', color: '#1e293b'}}>{course.course_title}</h5>
                                        </div>
                                        <div style={{display: 'grid', gap: '8px'}}>
                                            <p style={{fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px'}}>
                                                <span style={{opacity: 0.6}}>🆔</span> Section: {course.section}
                                            </p>
                                            <p style={{fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px'}}>
                                                <span style={{opacity: 0.6}}>⏱️</span> {course.time}
                                            </p>
                                            <p style={{fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px'}}>
                                                <span style={{opacity: 0.6}}>📅</span> {course.day}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary" style={{marginTop: '32px', width: '100%', padding: '14px'}} onClick={() => saveAsFavourite(routine, setNotification)}>
                                ⭐ Save as Favorite
                            </button>
                        </div>
                    ))}
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

const saveAsFavourite = async (routine, setNotification) => {
    try {
        const userId = 1; 
        await axios.post('http://localhost:5000/api/courses/save-favourite-routine', {
            userId,
            routine,
        });
        setNotification({ isOpen: true, title: 'Success', message: 'Routine saved as favourite!' });
    } catch (error) {
        console.error('Error saving favourite routine:', error);
        setNotification({ isOpen: true, title: 'Error', message: 'Error saving routine.' });
    }
};

export default RoutineGenerator;
