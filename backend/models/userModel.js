const db = require('../config/db');

const User = {
    create: async (userData) => {
        const query = "INSERT INTO users (username, email, password, role, name) VALUES (?, ?, ?, ?, ?)";
        return db.promise().query(query, userData);
    },

    findByEmail: async (email) => {
        const query = "SELECT * FROM users WHERE email = ?";
        return db.promise().query(query, [email]);
    },
};

module.exports = User;
