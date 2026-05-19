import React from 'react';
import './FeatureList.css';

const StudyMaterials = () => {
    return (
        <div className="feature-form-container" style={{maxWidth: '800px', textAlign: 'center'}}>
            <h2 style={{fontSize: '2rem', marginBottom: '20px'}}>Study Materials</h2>
            <p style={{color: '#64748b', fontSize: '1.1rem'}}>Access your course materials and resources here.</p>
            
            <div className="preview-box" style={{marginTop: '40px', padding: '60px', border: '2px dashed #e2e8f0', borderRadius: '24px'}}>
                <span style={{fontSize: '3rem', marginBottom: '20px', display: 'block'}}>📚</span>
                <h3 style={{fontSize: '1.25rem', color: '#1e293b'}}>Coming Soon</h3>
                <p style={{color: '#64748b', marginTop: '10px'}}>We are currently uploading materials for your courses. Check back later!</p>
            </div>
        </div>
    );
};

export default StudyMaterials;
