const AuthService = require('../services/auth.service');

exports.register = async (req, res, next) => {
    try {
        const user = await AuthService.registerUser(req.body);
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = await AuthService.loginUser(username, password);
        res.json({
            success: true,
            token
        });
    } catch (err) {
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await AuthService.getCurrentUser(req.user.id);
        res.json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};