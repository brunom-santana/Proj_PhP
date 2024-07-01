const Procedimento = require('../models/procedimentoModel');

exports.getAll = (req, res) => {
    Procedimento.getAll((err, results) => {
        if (err) {
            console.error("Erro ao realizar consulta: " + err);
            return res.status(500).send("Erro ao realizar consulta");
        }
        res.status(200).render('procedimento', { obj_procedimentos: results });
    });
};

exports.create = (req, res) => {
    const { nome, descricao, preco } = req.body;
    const procedimentos = { nome, descricao, preco };

    Procedimento.create(procedimentos, (err, result) => {
        if (err) {
            console.error("Erro ao Inserir: " + err);
            return res.status(500).send("Erro ao realizar Insert");
        }
        console.log("Procedimento inserido com o ID: " + result.insertId);
        res.status(201).redirect('/procedimento');
    });
};

exports.delete = (req, res) => {
    const procedimentosId = req.params.id;

    Procedimento.delete(procedimentosId, (err, result) => {
        if (err) {
            console.error("Erro ao Excluir: " + err);
            return res.status(500).send("Erro ao Excluir");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Procedimento nao encontrado");
        }
        console.log("Excluido com sucesso");
        res.redirect(200, '/procedimento');
    });
};