import React, { useState } from 'react';
import axios from 'axios';

const RoutineGenerator = () => {
    const [courseCount, setCourseCount] = useState(0);
    const [courseCodes, setCourseCodes] = useState([]);
    const [routines, setRoutines] = useState([]);

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
    
            console.log('Courses received from API:', courses); // Debug line
    
            // Pass the courseCount to the backend
            const generatedRoutines = generateNonConflictingRoutines(courses, courseCount);
            setRoutines(generatedRoutines);
        } catch (error) {
            console.error('Error generating routines:', error);
        }
    };

    const generateNonConflictingRoutines = (courses, requiredCount) => {
        // Helper function to parse time
        const parseTime = (timeString) => {
            const [start, end] = timeString.split('-').map(time => time.trim());
            return { start, end };
        };
    
        // Helper function to check time conflict
        const isConflict = (courseA, courseB) => {
            const timeA = parseTime(courseA.time);
            const timeB = parseTime(courseB.time);
    
            const startA = new Date(`1970/01/01 ${timeA.start}`);
            const endA = new Date(`1970/01/01 ${timeA.end}`);
            const startB = new Date(`1970/01/01 ${timeB.start}`);
            const endB = new Date(`1970/01/01 ${timeB.end}`);
    
            return (startA < endB && endA > startB) && (courseA.day === courseB.day);
        };
    
        // Generate all possible combinations of courses with the exact required count
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
    
        // Filter out routines with conflicts
        const filterNonConflictingRoutines = (combinations) => {
            return combinations.filter(routine => {
                const uniqueCourses = new Set(routine.map(course => course.course_code));
                if (uniqueCourses.size !== routine.length) return false; // Check for duplicates
    
                for (let i = 0; i < routine.length; i++) {
                    for (let j = i + 1; j < routine.length; j++) {
                        if (isConflict(routine[i], routine[j])) {
                            return false;
                        }
                    }
                }
                return true;
            });
        };
    
        const courseCombinations = generateCombinations(courses, requiredCount);
        const validRoutines = filterNonConflictingRoutines(courseCombinations);
    
        return validRoutines;
    };
    

    return (
        <div>
            <h1>Routine Generator</h1>
            <div>
                <label>How many courses do you want to take?</label>
                <input
                    type="number"
                    value={courseCount}
                    onChange={handleCourseCountChange}
                    min="1"
                />
            </div>

            {Array.from({ length: courseCount }).map((_, index) => (
                <div key={index}>
                    <label>Course Code {index + 1}:</label>
                    <input
                        type="text"
                        value={courseCodes[index] || ''}
                        onChange={(e) => handleCourseCodeChange(index, e)}
                    />
                </div>
            ))}

            <button onClick={generateRoutines}>Generate Routines</button>

            <div>
                <h2>Generated Routines:</h2>
                {routines.map((routine, index) => (
                    <div key={index}>
                        <h3>Routine {index + 1}</h3>
                        <ul>
                            {routine.map((course, i) => (
                                <li key={i}>
                                    {`${course.course_code} - ${course.course_title} (Section: ${course.section}, Time: ${course.time})`}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => saveAsFavourite(routine)}>Make it Favourite</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const saveAsFavourite = async (routine) => {
    try {
        const userId = 1; // This should come from your authentication system
        await axios.post('http://localhost:5000/api/courses/save-favourite-routine', {
            userId,
            routine,
        });
        alert('Routine saved as favourite!');
    } catch (error) {
        console.error('Error saving favourite routine:', error);
    }
};

export default RoutineGenerator;
