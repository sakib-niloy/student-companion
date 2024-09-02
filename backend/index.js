const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const examScheduleRoutes = require('./routes/examScheduleRoutes');
const courseRoutes = require('./routes/courseRoutes');
const facultyRoutes = require('./routes/facultyRoutes'); // Ensure this is correctly set up
const counsellingRoutes = require('./routes/counsellingRoutes');
const counsellingRequestsRouter = require('./routes/counsellingRequestsRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes); // For email-related routes
app.use('/api/exam-schedule', examScheduleRoutes); // For exam schedule-related routes
app.use('/api/courses', courseRoutes);
app.use('/api/faculty', facultyRoutes); // Ensure the routes are connected correctly
app.use('/api/counselling', counsellingRoutes); // Ensure counselling routes are correctly connected
app.use('/api/counselling-faculty', counsellingRequestsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
