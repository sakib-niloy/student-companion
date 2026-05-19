import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeatureList.css';
import NotificationModal from './NotificationModal';

const EmailForm = () => {
    const [templateName, setTemplateName] = useState('');
    const [toEmail, setToEmail] = useState('');
    const [placeholders, setPlaceholders] = useState({ name: '', id: '', section: '', course: '' });
    const [templates, setTemplates] = useState([]);     
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [courseCount, setCourseCount] = useState(0);  
    const [courses, setCourses] = useState([]);
    const [view, setView] = useState('list'); // 'list' or 'form'
    const [notification, setNotification] = useState({ isOpen: false, title: '', message: '' });

    useEffect(() => {
        axios.get('http://localhost:5000/api/email/templates')
            .then(response => {
                setTemplates(response.data);
            })
            .catch(error => {
                console.error('Error fetching templates:', error);
            });
    }, []);

    const handleSelectTemplate = (template) => {        
        setSelectedTemplate(template);
        setTemplateName(template.name);
        setView('form');
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
        for (const key in placeholders) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            preview = preview.replace(regex, placeholders[key]);
        }
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
            placeholders: { ...placeholders, courses }  
        };

        axios.post('http://localhost:5000/api/email/send-email', emailData)
            .then(response => {
                setNotification({ isOpen: true, title: 'Success', message: 'Email sent successfully!' });
                setView('list');
            })
            .catch(error => {
                setNotification({ isOpen: true, title: 'Error', message: 'Error sending email' });
                console.error('Error sending email:', error);
            });
    };

    if (view === 'list') {
        return (
            <div className="dashboard-container">
                <div style={{marginBottom: '40px'}}>
                    <h2 style={{fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px'}}>Email Templates</h2>
                    <p style={{color: '#64748b', fontSize: '1.1rem'}}>Select a template to generate a professional academic email.</p>
                </div>
                
                <div className="feature-list" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px'}}>
                    {templates.map(template => (
                        <div key={template.id} className="feature-card" onClick={() => handleSelectTemplate(template)}>
                            <div className="card-icon-circle" style={{width: '56px', height: '56px', borderRadius: '14px'}}>📧</div>
                            <div className="card-content">  
                                <h3 style={{fontSize: '1.2rem'}}>{template.name}</h3>
                                <p style={{fontSize: '0.85rem'}}>Standard template for {template.name.toLowerCase()}.</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <NotificationModal 
                    isOpen={notification.isOpen} 
                    title={notification.title} 
                    message={notification.message} 
                    onClose={() => setNotification({ ...notification, isOpen: false })} 
                />
            </div>
        );
    }

    return (
        <div className="feature-form-container">        
            <button className="btn" style={{marginBottom: '32px', background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569'}} onClick={() => setView('list')}>← Back to Templates</button>
            <h2 style={{fontSize: '1.75rem', marginBottom: '8px'}}>Generate {templateName} Email</h2>
            <p style={{color: '#64748b', marginBottom: '32px'}}>Fill in the details to customize your email.</p>
            
            <form onSubmit={handleSubmit} style={{display: 'grid', gap: '20px'}}>
                <div className="form-group">
                    <label>Recipient Email Address</label>
                    <input
                        type="email"
                        className="input-field"
                        placeholder="professor@university.edu"
                        value={toEmail}
                        onChange={(e) => setToEmail(e.target.value)}
                        required
                    />
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                    <div className="form-group">    
                        <label>Your Full Name</label>        
                        <input type="text" name="name" placeholder="John Doe" className="input-field" value={placeholders.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">    
                        <label>Student ID</label>
                        <input type="text" name="id" placeholder="2023-1-60-XXX" className="input-field" value={placeholders.id} onChange={handleInputChange} required />
                    </div>
                </div>

                {templateName === 'Leave of absence' && (
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                        <div className="form-group">    
                            <label>Section</label>     
                            <input type="text" name="section" placeholder="A" className="input-field" value={placeholders.section} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">    
                            <label>Course Name/Code</label>      
                            <input type="text" name="course" placeholder="CSE 1111" className="input-field" value={placeholders.course} onChange={handleInputChange} required />
                        </div>
                    </div>
                )}

                {(templateName === 'Add courses' || templateName === 'Drop courses') && (
                    <>
                        <div className="form-group">    
                            <label>Number of Courses</label>
                            <input type="number" className="input-field" value={courseCount} onChange={handleCourseCountChange} min="1" required />
                        </div>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px'}}>
                            {Array.from({ length: courseCount }).map((_, index) => (
                                <div key={index} className="form-group">
                                    <label>Course {index + 1}</label>
                                    <input type="text" className="input-field" placeholder="Course Code" value={courses[index] || ''} onChange={(e) => handleCourseNameChange(index, e)} required />  
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <button type="submit" className="btn btn-primary" style={{padding: '16px', fontSize: '1rem', marginTop: '10px'}}>Send Professional Email</button>
            </form>

            <div className="preview-box" style={{marginTop: '40px', border: '1px solid #e0e7ff', background: '#f8faff', padding: '32px', borderRadius: '20px'}}>
                <h3 style={{fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', color: '#1e293b'}}>Email Live Preview</h3>
                <div style={{
                    background: 'white', 
                    padding: '24px', 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0',
                    lineHeight: '1.6',
                    color: '#334155',
                    fontSize: '0.95rem'
                }} dangerouslySetInnerHTML={{ __html: generatePreview() || '<span style="color: #94a3b8">Your email preview will appear here...</span>' }}></div>
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

export default EmailForm;
