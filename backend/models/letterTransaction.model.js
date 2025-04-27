const db = require('../config/database');

class LetterTransaction {
    static async create({
                            letterId,
                            action,
                            fromUserId,
                            toUserId,
                            comments
                        }) {
        const [transaction] = await db('letter_transactions')
            .insert({
                letter_id: letterId,
                action,
                from_user_id: fromUserId,
                to_user_id: toUserId,
                comments
            })
            .returning('*');
        return transaction;
    }

    static async findByLetterId(letterId) {
        return db('letter_transactions')
            .where({ letter_id: letterId })
            .orderBy('created_at', 'desc');
    }
}

module.exports = LetterTransaction;