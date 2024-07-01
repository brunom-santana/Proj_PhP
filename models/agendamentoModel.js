const connection = require('../config/db');

const Agendamento = {
    create: (data, callback) => {
        connection.query('INSERT INTO agendamento SET ?;', data, callback);
    },
    delete: (agendamentosId, callback) => {
        connection.query('DELETE FROM agendamentos WHERE id = ?', [agendamentosId], callback);
    }
};

module.exports = Agendamento;
