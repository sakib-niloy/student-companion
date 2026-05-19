import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import EmailForm from './components/EmailForm';
import ExamSchedule from './components/ExamSchedule';   
import MainPage from './components/MainPage';
import CourseSelection from './components/CourseSelection';
import FacultySearch from './components/FacultySearch'; 
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import FacultyDashboard from './components/FacultyDashboard';
import CounsellingRequests from './components/CounsellingRequests';
import StudyMaterials from './components/StudyMaterials';
import './App.css';

// Simple Protected Route wrapper
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');        
    if (!token) {
        return <Navigate to="/sign-in" replace />;      
    }
    return <Layout>{children}</Layout>;
};

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />

                    {/* Protected Routes with Layout */}
                    <Route path="/main-page" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
                    <Route path="/email-form" element={<ProtectedRoute><EmailForm /></ProtectedRoute>} />       
                    <Route path="/exam-schedule" element={<ProtectedRoute><ExamSchedule /></ProtectedRoute>} /> 
                    <Route path="/course-selection" element={<ProtectedRoute><CourseSelection /></ProtectedRoute>} />
                    <Route path="/faculty-search" element={<ProtectedRoute><FacultySearch /></ProtectedRoute>} />
                    <Route path="/my-counselling" element={<ProtectedRoute><CounsellingRequests /></ProtectedRoute>} />
                    <Route path="/faculty-dashboard" element={<ProtectedRoute><FacultyDashboard /></ProtectedRoute>} />
                    <Route path="/study-materials" element={<ProtectedRoute><StudyMaterials /></ProtectedRoute>} />   
                    <Route path="/events" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/sign-in" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
