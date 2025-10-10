import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmailForm from './components/EmailForm';
import ExamSchedule from './components/ExamSchedule'; // Create this component
import MainPage from './components/MainPage'; // HomePage is the main page
import CourseSelection from './components/CourseSelection';
import FacultySearch from './components/FacultySearch';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import FacultyDashboard from './components/FacultyDashboard';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Signup</Link>
                        </li>
                        <li>
                            <Link to="/sign-in">Sign in</Link>
                        </li>
                        <li>
                            <Link to="/main-page">Home</Link>
                        </li>
                        <li>
                            <Link to="/email-form">Email Form</Link>
                        </li>
                        <li>
                            <Link to="/exam-schedule">Exam Schedule</Link>
                        </li>
                        <li>
                            <Link to="/course-selection">Course Selection</Link>
                        </li>
                        <li>
                            <Link to="/faculty-search">Counselling Booking</Link>
                        </li>
                        <li>
                            <Link to="/faculty-dashboard">Counselling Booking</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/main-page" element={<MainPage />} />
                    <Route path="/email-form" element={<EmailForm />} />
                    <Route path="/exam-schedule" element={<ExamSchedule />} />
                    <Route path="/course-selection" element={<CourseSelection />} />
                    <Route path="/faculty-search" element={<FacultySearch />} />
                    <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
