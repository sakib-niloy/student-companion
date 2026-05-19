import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { 
    LayoutDashboard, 
    Users, 
    Calendar, 
    BookOpen, 
    Mail, 
    Clock, 
    PartyPopper, 
    Settings, 
    LogOut, 
    ChevronLeft, 
    Search, 
    MessageSquare, 
    Bell 
} from 'lucide-react';
import './Layout.css';
import NotificationModal from './NotificationModal';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({ name: 'Student Name', username: 'ID' });
    const [notification, setNotification] = useState({ isOpen: false, title: '', message: '' });

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);       
                setUser({
                    name: decoded.name || 'Student Name',
                    username: decoded.username || decoded.id
                });
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }, []);

    const menuItems = [
        { name: 'Dashboard', path: '/main-page', icon: <LayoutDashboard size={20} /> },
        { name: 'Faculty', path: '/faculty-search', icon: <Users size={20} /> },
        { name: 'My Counselling', path: '/my-counselling', icon: <Clock size={20} /> },
        { name: 'Class Routine', path: '/course-selection', icon: <Calendar size={20} /> },
        { name: 'Study materials', path: '/study-materials', icon: <BookOpen size={20} /> },
        { name: 'Email Generator', path: '/email-form', icon: <Mail size={20} /> },
        { name: 'Exam Schedule', path: '/exam-schedule', icon: <Clock size={20} /> },
        { name: 'Events', path: '/events', icon: <PartyPopper size={20} /> },
        { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    ];

    const getPageTitle = () => {
        const currentItem = menuItems.find(item => item.path === location.pathname);
        return currentItem ? currentItem.name : 'Student Companion';
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/sign-in');
    };

    const handleIconClick = (type) => {
        setNotification({ isOpen: true, title: 'Coming Soon', message: `${type} feature coming soon!` });
    };

    return (
        <div className="main-container">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-circle">SC</div>
                    <span>Student Companion</span>      
                </div>
                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-text">{item.name}</span>
                        </Link>
                    ))}
                </nav>
                <button className="logout-btn" onClick={handleLogout}>
                    <span className="nav-icon"><LogOut size={20} /></span>
                    <span>LOGOUT</span>
                </button>
            </aside>
            <div className="content-wrapper">
                <header className="topbar">
                    <div className="topbar-left">       
                        <button className="back-btn" onClick={() => navigate(-1)}>
                            <ChevronLeft size={20} />
                        </button>
                        <h2>{getPageTitle()}</h2>       
                    </div>
                    <div className="topbar-center">     
                        <div className="search-bar">    
                            <Search size={18} className="search-icon-svg" />
                            <input type="text" placeholder="Search here" />
                        </div>
                    </div>
                    <div className="topbar-right">      
                        <div className="icon-badge" onClick={() => handleIconClick('Messages')}>
                            <MessageSquare size={22} />
                            <span className="badge">5</span>
                        </div>
                        <div className="icon-badge" onClick={() => handleIconClick('Notifications')}>
                            <Bell size={22} />
                            <span className="badge">4</span>
                        </div>
                        <div className="user-profile" onClick={() => handleIconClick('Profile Settings')} style={{cursor: 'pointer'}}>
                            <div className="avatar">
                                <Users size={24} color="#64748b" />
                            </div>
                            <div className="user-info"> 
                                <span className="user-name">{user.name}</span>
                                <span className="user-id">{user.username}</span>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="main-content">
                    {children}
                </main>
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

export default Layout;
