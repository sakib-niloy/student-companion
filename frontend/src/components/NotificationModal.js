import React from 'react';

const NotificationModal = ({ isOpen, title, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 99999
        }}>
            <div style={{
                background: 'white', padding: '40px', borderRadius: '24px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                textAlign: 'center', maxWidth: '400px', width: '90%'
            }}>
                <h3 style={{fontSize: '1.5rem', fontWeight: '800', marginBottom: '15px'}}>{title}</h3>
                <p style={{color: '#64748b', marginBottom: '30px'}}>{message}</p>
                <button className="btn btn-primary" style={{width: '100%'}} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default NotificationModal;
