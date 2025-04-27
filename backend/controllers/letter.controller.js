const LetterService = require('../services/letter.service');

exports.createLetter = async (req, res, next) => {
    try {
        const letter = await LetterService.createLetter(
            { ...req.body, file: req.file },
            req.user.id
        );
        res.status(201).json({
            success: true,
            data: letter
        });
    } catch (err) {
        next(err);
    }
};

exports.getLetters = async (req, res, next) => {
    try {
        const letters = await LetterService.getLettersByUser(req.user.id);
        res.json({
            success: true,
            data: letters
        });
    } catch (err) {
        next(err);
    }
};

exports.getLetter = async (req, res, next) => {
    try {
        const letter = await LetterService.getLetterById(req.params.id, req.user.id);
        res.json({
            success: true,
            data: letter
        });
    } catch (err) {
        next(err);
    }
};

exports.updateLetter = async (req, res, next) => {
    try {
        const letter = await LetterService.updateLetter(
            req.params.id,
            req.body,
            req.user.id
        );
        res.json({
            success: true,
            data: letter
        });
    } catch (err) {
        next(err);
    }
};

exports.closeLetter = async (req, res, next) => {
    try {
        const letter = await LetterService.closeLetter(
            req.params.id,
            req.user.id,
            req.body.comments
        );
        res.json({
            success: true,
            data: letter
        });
    } catch (err) {
        next(err);
    }
};

exports.getLetterTransactions = async (req, res, next) => {
    try {
        const transactions = await LetterService.getLetterTransactions(req.params.id);
        res.json({
            success: true,
            data: transactions
        });
    } catch (err) {
        next(err);
    }
};