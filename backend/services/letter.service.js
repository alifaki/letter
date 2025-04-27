const Letter = require('../models/letter.model');
const LetterTransaction = require('../models/letterTransaction.model');
const fs = require('fs');
const path = require('path');
const config = require('../config');

class LetterService {
    static async createLetter(letterData, userId) {
        const { file, ...data } = letterData;

        // Handle file upload
        let filePath = null;
        if (file) {
            const uploadDir = path.join(__dirname, '../uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const fileName = `${Date.now()}-${file.originalname}`;
            filePath = path.join('uploads', fileName);

            await fs.promises.writeFile(
                path.join(__dirname, '../', filePath),
                file.buffer
            );
        }

        // Create letter
        const letter = await Letter.create({
            ...data,
            filePath,
            createdBy: userId
        });

        // Record transaction
        await LetterTransaction.create({
            letterId: letter.id,
            action: 'created',
            fromUserId: userId,
            comments: 'Letter created'
        });

        return letter;
    }

    static async getLetterById(id, userId) {
        const letter = await Letter.findById(id);
        if (!letter) {
            throw new Error('Letter not found');
        }

        // In a real app, you might want to check permissions here
        return letter;
    }

    static async getLettersByUser(userId) {
        return Letter.findAllByUser(userId);
    }

    static async updateLetter(id, updates, userId) {
        const letter = await Letter.findById(id);
        if (!letter) {
            throw new Error('Letter not found');
        }

        const updatedLetter = await Letter.update(id, updates);

        // Record transaction
        await LetterTransaction.create({
            letterId: id,
            action: 'updated',
            fromUserId: userId,
            comments: updates.comments || 'Letter updated'
        });

        return updatedLetter;
    }

    static async closeLetter(id, userId, comments) {
        const letter = await Letter.findById(id);
        if (!letter) {
            throw new Error('Letter not found');
        }

        // Record transaction
        await LetterTransaction.create({
            letterId: id,
            action: 'closed',
            fromUserId: userId,
            comments: comments || 'Letter closed'
        });

        return letter;
    }

    static async getLetterTransactions(letterId) {
        return LetterTransaction.findByLetterId(letterId);
    }
}

module.exports = LetterService;