const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./config/db');

const pacienteController = require('./controllers/pacienteController');
const dentistaController = require('./controllers/dentistaController');
const procedimentoController = require('./controllers/procedimentoController');
const agendamentoController = require('./controllers/agendamentoController');

const app = express();

// Configurar qual biblioteca será utilizada para renderizar as views
app.set('view engine', 'ejs');

// Configurando o diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, './public')));

// Middleware que fará o parsing de JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.get('/', (req, res) => {
    res.status(200).render('home');
});

// Rotas de Pacientes
app.get('/paciente', pacienteController.getAll);
app.post('/cad_paciente', pacienteController.create);
app.delete('/paciente/:id', pacienteController.delete);
app.get('/cad_paciente', (req, res) => res.status(200).render('cad_paciente'));

// Rotas de Dentistas
app.get('/dentista', dentistaController.getAll);
app.post('/cad_dentista', dentistaController.create);
app.delete('/dentista/:id', dentistaController.delete);
app.get('/cad_dentista', (req, res) => res.status(200).render('cad_dentista'));

// Rotas de Procedimentos
app.get('/procedimento', procedimentoController.getAll);
app.post('/cad_procedimento', procedimentoController.create);
app.delete('/procedimento/:id', procedimentoController.delete);
app.get('/cad_procedimento', (req, res) => res.status(200).render('cad_procedimento'));

// Rotas de Agendamentos
app.get('/agendamento', (req, res) => {
    const sql = `
        SELECT 
            a.id AS agendamento_id,
            a.dataAgendada,
            p.id AS paciente_id,
            p.nome AS paciente_nome,
            d.id AS dentista_id,
            d.nome AS dentista_nome,
            proc.id AS procedimento_id,
            proc.nome AS procedimento_nome
        FROM 
            agendamentos a
        JOIN 
            pacientes p ON a.fk_pacientes_id = p.id
        JOIN 
            dentistas d ON a.fk_dentistas_id = d.id
        JOIN 
            procedimentos proc ON a.fk_procedimentos_id = proc.id;`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao realizar a consulta: " + err);
            res.status(500).send("Erro ao realizar a consulta");
            return;
        }

        res.render('agendamento', { agendamentos: results });
    });
});
app.post('/cad_agendamento', (req, res) => {
    const { paciente, dentista, procedimento, dataAgendada } = req.body;

    // Montar o objeto com os dados do agendamento
    const agendamento = {
        fk_pacientes_id: paciente,
        fk_dentistas_id: dentista,
        fk_procedimentos_id: procedimento,
        dataAgendada: dataAgendada
    };

    // Inserir o agendamento na tabela do banco de dados
    const sqlInsert = 'INSERT INTO agendamentos SET ?';
    connection.query(sqlInsert, agendamento, (err, result) => {
        if (err) {
            console.error('Erro ao inserir agendamento: ', err);
            res.status(500).send('Erro ao cadastrar agendamento');
            return;
        }
        console.log('Agendamento inserido com sucesso, ID:', result.insertId);
        res.redirect('/agendamento'); // Redirecionar após inserção (pode ser a página de listagem de agendamentos)
    });
});
app.delete('/agendamento/:id', agendamentoController.delete);
app.get('/cad_agendamento', (req, res) => {
    // Consulta ao banco de dados para obter pacientes, dentistas e procedimentos
    const sqlPacientes = 'SELECT id, nome FROM pacientes';
    const sqlDentistas = 'SELECT id, nome FROM dentistas';
    const sqlProcedimentos = 'SELECT id, nome FROM procedimentos';

    // Execução das consultas
    connection.query(sqlPacientes, (errPacientes, pacientes) => {
        if (errPacientes) throw errPacientes;

        connection.query(sqlDentistas, (errDentistas, dentistas) => {
            if (errDentistas) throw errDentistas;

            connection.query(sqlProcedimentos, (errProcedimentos, procedimentos) => {
                if (errProcedimentos) throw errProcedimentos;

                // Renderiza o template EJS com os resultados das consultas
                res.render('cad_agendamento', {
                    pacientes: pacientes,
                    dentistas: dentistas,
                    procedimentos: procedimentos
                });
            });
        });
    });
});


// Configurando o servidor para "escutar" um socket (ip+porta)
app.listen(3000, () => {
    console.log("Servidor executando na porta 3000");
});
