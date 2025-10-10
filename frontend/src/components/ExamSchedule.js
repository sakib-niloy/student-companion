import React, { useState } from 'react';
import axios from 'axios';

const ExamSchedule = () => {
    const [department, setDepartment] = useState('');
    const [courseCount, setCourseCount] = useState(1);
    const [courses, setCourses] = useState([{ courseCode: '', section: '' }]);
    const [schedule, setSchedule] = useState([]);

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
            setSchedule(response.data);
        } catch (error) {
            console.error('Error fetching schedule:', error);
            alert('Failed to fetch schedule. Please check your input.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSchedule();
    };

    return (
        <div>
            <h1>Exam Schedule</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Department:</label>
                    <select value={department} onChange={handleDepartmentChange} required>
                        <option value="">Select Department</option>
                        <option value="cse">CSE</option>
                        <option value="eee">EEE</option>
                        <option value="civil">Civil</option>
                    </select>
                </div>

                <div>
                    <label>Number of Courses:</label>
                    <input
                        type="number"
                        value={courseCount}
                        onChange={handleCourseCountChange}
                        min="1"
                        required
                    />
                </div>

                {courses.map((course, index) => (
                    <div key={index}>
                        <label>Course Code {index + 1}:</label>
                        <input
                            type="text"
                            name="courseCode"
                            value={course.courseCode}
                            onChange={(e) => handleCourseChange(index, e)}
                            required
                        />
                        <label>Section {index + 1}:</label>
                        <input
                            type="text"
                            name="section"
                            value={course.section}
                            onChange={(e) => handleCourseChange(index, e)}
                            required
                        />
                    </div>
                ))}

                <button type="submit">Fetch Schedule</button>
            </form>

            {schedule.length > 0 && (
                <div>
                    <h2>Schedule</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Course Title</th>
                                <th>Course Code</th>
                                <th>Date</th>
                                <th>Day</th>
                                <th>Time</th>
                                <th>Section</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.map((exam, index) => (
                                <tr key={index}>
                                    <td>{exam.course_title}</td>
                                    <td>{exam.course_code}</td>
                                    <td>{exam.date}</td>
                                    <td>{exam.day}</td>
                                    <td>{exam.time}</td>
                                    <td>{exam.section}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ExamSchedule;
