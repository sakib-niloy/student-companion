const db = require('../config/db');

const Faculty = {
    searchByName: async (name) => {
        const query = "SELECT * FROM faculty WHERE name LIKE ?";
        return db.promise().query(query, [`%${name}%`]);
    },
};

module.exports = Faculty;
