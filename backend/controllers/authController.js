const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.signup = async (req, res) => {
    const { username, email, password, role, name } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (username, email, password, role, name) VALUES (?, ?, ?, ?, ?)";
        await db.query(query, [username, email, hashedPassword, role, name]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Use db.promise().query() to get a promise-based interface
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length > 0) {
            const user = rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ 
                    id: user.id, 
                    role: user.role,
                    name: user.name,
                    username: user.username 
                }, 'your_jwt_secret', { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};

exports.getProfile = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const [rows] = await db.query("SELECT id, username, email, role, name FROM users WHERE id = ?", [decoded.id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};