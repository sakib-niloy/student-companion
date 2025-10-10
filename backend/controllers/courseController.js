// controllers/courseController.js
const upcomingCourses = require('../models/upcomingCourses');


exports.getCoursesByCodes = async (req, res) => {
    const { courseCodes } = req.body;
    try {
        const courses = await upcomingCourses.getCoursesByCodes(courseCodes);

        if (courses.length === 0) {
            return res.status(404).json({ message: 'No courses found' });
        }

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Database query error' });
    }
};



exports.saveFavouriteRoutine = async (req, res) => {
    const { userId, routine } = req.body;
    try {
        await upcomingCourses.saveFavouriteRoutine(userId, routine);
        res.status(200).json({ message: 'Favourite routine saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Database query error' });
    }
};
