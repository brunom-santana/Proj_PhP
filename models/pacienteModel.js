const connection = require('../config/db');

const Paciente = {
    create: (data, callback) => {
        connection.query('INSERT INTO pacientes SET ?', data, callback);
    },
    getAll: (callback) => {
        connection.query('SELECT * FROM pacientes;', callback);
    },
    delete: (id, callback) => {
        connection.query('DELETE FROM pacientes WHERE id = ?', [id], callback);
    }
};

module.exports = Paciente;
