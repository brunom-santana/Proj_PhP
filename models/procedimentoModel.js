const connection = require('../config/db');

const Procedimento = {
    create: (data, callback) => {
        connection.query('INSERT INTO procedimentos SET ?', data, callback);
    },
    getAll: (callback) => {
        connection.query('SELECT * FROM procedimentos;', callback);
    },
    delete: (id, callback) => {
        connection.query('DELETE FROM procedimentos WHERE id = ?', [id], callback);
    }
};

module.exports = Procedimento;
