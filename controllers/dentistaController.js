const Dentista = require('../models/dentistaModel');

exports.getAll = (req, res) => {
    Dentista.getAll((err, results) => {
        if (err) {
            console.error("Erro ao realizar consulta: " + err);
            return res.status(500).send("Erro ao realizar consulta");
        }
        res.status(200).render('dentista', { obj_dentistas: results });
    });
};

exports.create = (req, res) => {
    const { nome, cpf, email, dataNascimento, crm } = req.body;
    const dentistas = { nome, cpf, email, dataNascimento, crm };

    Dentista.create(dentistas, (err, result) => {
        if (err) {
            console.error("Erro ao Inserir: " + err);
            return res.status(500).send("Erro ao realizar Insert");
        }
        console.log("Dentista inserido com o ID: " + result.insertId);
        res.status(201).redirect('/dentista');
    });
};

exports.delete = (req, res) => {
    const dentistaId = req.params.id;

    Dentista.delete(dentistaId, (err, result) => {
        if (err) {
            console.error("Erro ao Excluir: " + err);
            return res.status(500).send("Erro ao Excluir");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Dentista nao encontrado");
        }
        console.log("Excluido com sucesso");
        res.redirect(200, '/dentista');
    });
};
