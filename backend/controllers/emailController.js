const pool = require('../config/db');
const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
    const { templateName, toEmail, placeholders, courses } = req.body;

    try {
        const [results] = await pool.query('SELECT * FROM email_templates WHERE name = ?', [templateName]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Template not found' });
        }

        const template = results[0];
        let emailBody = template.body;

        // Replace placeholders in the template with actual values
        for (const key in placeholders) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            emailBody = emailBody.replace(regex, placeholders[key]);
        }

        // Replace courses placeholder if it exists
        if (courses && courses.length > 0) {
            const courseList = courses.join(', ');
            emailBody = emailBody.replace('{{courses}}', courseList);
        } else {
            emailBody = emailBody.replace('{{courses}}', ''); // Handle empty courses case
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: template.subject,
            html: emailBody,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Error sending email' });
            }
            res.status(200).json({ message: 'Email sent successfully' });
        });
    } catch (err) {
        return res.status(500).json({ error: 'Database query error' });
    }
};

exports.getTemplates = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM email_templates');
        res.status(200).json(results);
    } catch (err) {
        return res.status(500).json({ error: 'Database query error' });
    }
};
