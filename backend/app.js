const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { check, validationResult } = require('express-validator');
const config = require('./config');
// Import routes
const authRoutes = require('./routes/auth.routes');
const letterRoutes = require('./routes/letter.routes');
const db = require("./config/database");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/letters', letterRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    // Handle file upload errors
    if (err.code === 'LIMIT_FILE_TYPES') {
        return res.status(422).json({ error: 'Only PDF, JPEG, and PNG files are allowed' });
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(422).json({ error: 'File too large. Max size is 5MB' });
    }

    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = config.port;
async function initializeDatabase() {
    try {
        await db.migrate.latest();
        console.log('Migrations run successfully');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

initializeDatabase().then(() => {
    // Start your server here
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

module.exports = app;