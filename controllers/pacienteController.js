const Paciente = require('../models/pacienteModel');

exports.getAll = (req, res) => {
    Paciente.getAll((err, results) => {
        if (err) {
            console.error("Erro ao realizar consulta: " + err);
            return res.status(500).send("Erro ao realizar consulta");
        }
        res.status(200).render('paciente', { obj_pacientes: results });
    });
};

exports.create = (req, res) => {
    const { nome, cpf, email, dataNascimento } = req.body;
    const pacientes = { nome, cpf, email, dataNascimento };

    Paciente.create(pacientes, (err, result) => {
        if (err) {
            console.error("Erro ao Inserir: " + err);
            return res.status(500).send("Erro ao realizar Insert");
        }
        console.log("Cliente inserido com o ID: " + result.insertId);
        res.status(200).redirect('/paciente');
    });
};

exports.delete = (req, res) => {
    const pacienteId = req.params.id;

    Paciente.delete(pacienteId, (err, result) => {
        if (err) {
            console.error("Erro ao Excluir: " + err);
            return res.status(500).send("Erro ao Excluir");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Cliente nao encontrado");
        }
        console.log("Excluido com sucesso");
        res.redirect(200, '/paciente');
    });
};
