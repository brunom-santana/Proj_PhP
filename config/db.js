const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'proj_top'
});

connection.connect((err) => {
    if(err){
        console.error("Erro ao Conectar ao banco: " + err);
        return;
    }
    console.log("Conexao de ID " + connection.threadId + " foi estabelecida!");
});
module.exports = connection;