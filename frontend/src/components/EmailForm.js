import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailForm = () => {
    const [templateName, setTemplateName] = useState('');
    const [toEmail, setToEmail] = useState('');
    const [placeholders, setPlaceholders] = useState({ name: '', id: '', section: '', course: '' });
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [courseCount, setCourseCount] = useState(0);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/email/templates')
            .then(response => {
                setTemplates(response.data);
            })
            .catch(error => {
                console.error('Error fetching templates:', error);
            });
    }, []);

    const handleTemplateChange = (e) => {
        const selectedName = e.target.value;
        const template = templates.find(t => t.name === selectedName);
        setTemplateName(selectedName);
        setSelectedTemplate(template || {});
        setCourses([]);
        setCourseCount(0);
        setPlaceholders({ name: '', id: '', section: '', course: '' });
    };

    const handleInputChange = (e) => {
        setPlaceholders({
            ...placeholders,
            [e.target.name]: e.target.value
        });
    };

    const handleCourseCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setCourseCount(count);
        setCourses(Array(count).fill(''));
    };

    const handleCourseNameChange = (index, e) => {
        const newCourses = [...courses];
        newCourses[index] = e.target.value;
        setCourses(newCourses);
    };

    const generatePreview = () => {
        if (!selectedTemplate) return '';

        let preview = selectedTemplate.body;

        // Replace placeholders in the template with actual values
        for (const key in placeholders) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            preview = preview.replace(regex, placeholders[key]);
        }

        // Add courses to the preview
        if (courses.length > 0) {
            const courseList = courses.join(', ');
            const courseRegex = new RegExp(`{{courses}}`, 'g');
            preview = preview.replace(courseRegex, courseList);
        }

        return preview;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailData = {
            templateName,
            toEmail,
            placeholders: {
                ...placeholders,
                courses
            }
        };

        axios.post('http://localhost:5000/api/email/send-email', emailData)
            .then(response => {
                alert('Email sent successfully!');
            })
            .catch(error => {
                alert('Error sending email');
                console.error('Error sending email:', error);
            });
    };

    return (
        <div>
            <h1>Email Template</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Template Name:</label>
                    <select value={templateName} onChange={handleTemplateChange} required>
                        <option value="">Select a template</option>
                        {templates.map(template => (
                            <option key={template.id} value={template.name}>{template.name}</option>
                        ))}
                    </select>
                </div>

                {selectedTemplate && (
                    <div>
                        {templateName === 'Leave of absence' && (
                            <>
                                <div>
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={placeholders.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>ID:</label>
                                    <input
                                        type="text"
                                        name="id"
                                        value={placeholders.id}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Section:</label>
                                    <input
                                        type="text"
                                        name="section"
                                        value={placeholders.section}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Course:</label>
                                    <input
                                        type="text"
                                        name="course"
                                        value={placeholders.course}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {templateName === 'Add courses' && (
                            <>

                                <div>
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={placeholders.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>ID:</label>
                                    <input
                                        type="text"
                                        name="id"
                                        value={placeholders.id}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>


                                <div>
                                    <label>How many courses do you want to add?</label>
                                    <input
                                        type="number"
                                        value={courseCount}
                                        onChange={handleCourseCountChange}
                                        min="1"
                                        required
                                    />
                                </div>
                                {Array.from({ length: courseCount }).map((_, index) => (
                                    <div key={index}>
                                        <label>Course {index + 1}:</label>
                                        <input
                                            type="text"
                                            value={courses[index] || ''}
                                            onChange={(e) => handleCourseNameChange(index, e)}
                                            required
                                        />
                                    </div>
                                ))}
                            </>
                        )}

                        {templateName === 'Drop courses' && (
                            <>
                                <div>
                                    <label>How many courses do you want to drop?</label>
                                    <input
                                        type="number"
                                        value={courseCount}
                                        onChange={handleCourseCountChange}
                                        min="1"
                                        required
                                    />
                                </div>
                                {Array.from({ length: courseCount }).map((_, index) => (
                                    <div key={index}>
                                        <label>Course {index + 1}:</label>
                                        <input
                                            type="text"
                                            value={courses[index] || ''}
                                            onChange={(e) => handleCourseNameChange(index, e)}
                                            required
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}

                <div>
                    <label>To Email:</label>
                    <input
                        type="email"
                        value={toEmail}
                        onChange={(e) => setToEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Email</button>
            </form>

            <div>
                <h3>Email Preview:</h3>
                <div dangerouslySetInnerHTML={{ __html: generatePreview() }}></div>
            </div>
        </div>
    );
};

export default EmailForm;
