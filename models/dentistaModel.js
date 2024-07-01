const connection = require('../config/db');

const Dentista = {
    create: (data, callback) => {
        connection.query('INSERT INTO dentistas SET ?', data, callback);
    },
    getAll: (callback) => {
        connection.query('SELECT * FROM dentistas;', callback);
    },
    delete: (id, callback) => {
        connection.query('DELETE FROM dentistas WHERE id = ?', [id], callback);
    }
};

module.exports = Dentista;
