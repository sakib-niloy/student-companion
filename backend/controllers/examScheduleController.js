const pool = require('../config/db');

const getExamSchedule = async (req, res) => {
    const { department, courses } = req.body;

    if (!department || !courses || !Array.isArray(courses)) {
        console.log('Invalid input:', { department, courses });
        return res.status(400).json({ message: 'Missing required parameters or invalid data' });
    }

    try {
        let tableName;
        switch (department) {
            case 'cse':
                tableName = 'cse_exams';
                break;
            case 'eee':
                tableName = 'eee_exams';
                break;
            case 'civil':
                tableName = 'civil_exams';
                break;
            default:
                console.log('Invalid department:', department);
                return res.status(400).json({ message: 'Invalid department' });
        }

        const queries = courses.map(({ courseCode, section }) =>
            `SELECT * FROM ${tableName} WHERE course_code = ? AND section = ?`
        ).join(' UNION ALL ');

        const queryValues = courses.flatMap(({ courseCode, section }) => [courseCode, section]);

        console.log('Executing query:', queries, 'With values:', queryValues);

        const [results] = await pool.query(queries, queryValues);
        res.json(results);
    } catch (error) {
        console.error('Error fetching schedule:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getExamSchedule };
