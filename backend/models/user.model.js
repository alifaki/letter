const db = require('../config/database');

class User {
    static async create({ username, email, passwordHash, fullName }) {
        const [user] = await db('users')
            .insert({
                username,
                email,
                password_hash: passwordHash,
                full_name: fullName
            })
            .returning('*');
        return user;
    }

    static async findByUsername(username) {
        return db('users').where({ username }).first();
    }

    static async findByEmail(email) {
        return db('users').where({ email }).first();
    }

    static async findById(id) {
        return db('users').where({ id }).first();
    }
}

module.exports = User;