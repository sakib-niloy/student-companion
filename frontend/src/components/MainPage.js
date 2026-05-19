import React from 'react';
import { Link } from 'react-router-dom';
import './FeatureList.css';

const MainPage = () => {
    const dashboardItems = [
        { title: 'Faculty Counselling', path: '/faculty-search', icon: '?????', desc: 'Book a session with your professors and get academic guidance.' },
        { title: 'Class Routine', path: '/course-selection', icon: '??', desc: 'Generate your non-conflicting routine with automated scheduling.' },
        { title: 'Email Generator', path: '/email-form', icon: '??', desc: 'Create professional academic emails from curated templates.' },
        { title: 'Exam Schedule', path: '/exam-schedule', icon: '??', desc: 'Stay updated with your upcoming exam dates and venues.' },
    ];

    return (
        <div className="dashboard-container">
            <div style={{marginBottom: '40px'}}>
                <h1 style={{fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px'}}>Feature Dashboard</h1>
                <p style={{color: '#64748b', fontSize: '1.1rem'}}>Quickly access all your student resources in one place.</p>
            </div>
            <div className="feature-list">
                {dashboardItems.map((item, index) => (  
                    <Link key={index} to={item.path} style={{textDecoration: 'none'}}>
                        <div className="feature-card">
                            <div className="card-icon-circle">{item.icon}</div>
                            <div className="card-content">
                                <h3>{item.title}</h3>   
                                <p>{item.desc}</p>      
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
