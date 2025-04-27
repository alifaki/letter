const express = require('express');
const router = express.Router();
const letterController = require('../controllers/letter.controller');
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const upload = require('../middleware/upload');

router.post(
    '/',
    auth,
    upload.single('file'),
    [
        check('referenceNumber', 'Reference number is required').not().isEmpty(),
        check('subject', 'Subject is required').not().isEmpty(),
        check('sender', 'Sender is required').not().isEmpty(),
        check('recipient', 'Recipient is required').not().isEmpty(),
        check('dateReceived', 'Date received is required').not().isEmpty()
    ],
    letterController.createLetter
);

router.get('/', auth, letterController.getLetters);
router.get('/:id', auth, letterController.getLetter);
router.put('/:id', auth, letterController.updateLetter);
router.post('/:id/close', auth, letterController.closeLetter);
router.get('/:id/transactions', auth, letterController.getLetterTransactions);

module.exports = router;