const Agendamento = require('../models/agendamentoModel');

exports.getAll = (req, res) => {
    Agendamento.getAll((err, results) => {
        if (err) {
            console.error("Erro ao realizar consulta: " + err);
            return res.status(500).send("Erro ao realizar consulta");
        }
        res.render(200, 'agendamento', { obj_agendamentos: results });
    });
};

exports.create = (req, res) => {
    const { dataAgendada } = req.body;
    const agendamentos = { dataAgendada };

    Agendamento.create(agendamentos, (err, result) => {
        if (err) {
            console.error("Erro ao Inserir: " + err);
            return res.status(500).send("Erro ao realizar Insert");
        }
        console.log("Agendamento inserido com o ID: " + result.insertId);
        res.status(201).redirect('/agendamento');
    });
};

exports.delete = (req, res) => {
    const agendamentosId = req.params.id;

    Agendamento.delete(agendamentosId, (err, result) => {
        if (err) {
            console.error("Erro ao Excluir: " + err);
            return res.status(500).send("Erro ao Excluir");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Agendamento nao encontrado");
        }
        console.log("Excluido com sucesso");
        res.redirect(200, '/agendamento');
    });
};