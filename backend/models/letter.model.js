const db = require('../config/database');

class Letter {
    static async create({
                            referenceNumber,
                            subject,
                            content,
                            sender,
                            recipient,
                            dateReceived,
                            filePath,
                            createdBy
                        }) {
        const [letter] = await db('letters')
            .insert({
                reference_number: referenceNumber,
                subject,
                content,
                sender,
                recipient,
                date_received: dateReceived,
                file_path: filePath,
                created_by: createdBy
            })
            .returning('*');
        return letter;
    }

    static async findById(id) {
        return db('letters').where({ id }).first();
    }

    static async findByReferenceNumber(refNumber) {
        return db('letters').where({ reference_number: refNumber }).first();
    }

    static async findAllByUser(userId) {
        return db('letters').where({ created_by: userId });
    }

    static async update(id, updates) {
        const [letter] = await db('letters')
            .where({ id })
            .update({
                ...updates,
                updated_at: db.fn.now()
            })
            .returning('*');
        return letter;
    }

    static async delete(id) {
        return db('letters').where({ id }).del();
    }
}

module.exports = Letter;