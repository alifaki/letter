const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config');

class AuthService {
    static async registerUser(userData) {
        const { username, email, password } = userData;

        // Check if user exists
        const existingUser = await User.findByUsername(username) || await User.findByEmail(email);
        if (existingUser) {
            throw new Error('Username or email already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create user
        return User.create({
            username,
            email,
            passwordHash,
            fullName: userData.fullName
        });
    }

    static async loginUser(username, password) {
        const user = await User.findByUsername(username);
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Create JWT
        const payload = {
            user: {
                id: user.id,
                username: user.username
            }
        };

        return jwt.sign(payload, config.jwtSecret, { expiresIn: '8h' });
    }

    static async getCurrentUser(userId) {
        return User.findById(userId);
    }
}

module.exports = AuthService;