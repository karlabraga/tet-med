const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

var cors = require('cors');
app.use(express.static("public"));
app.use(cors());

app.use(express.json());

const db = {   //isso é uma constante db -> que é um objeto em js que armazena informações de configurações a um banco de dados
  host: "54.173.126.116", // ip de onde o banco de dados está hospedado 
  port: 3306, //qual porta o servidor mysql está escutando
  user: "00000000000", //define o nome do usuário para autenticação com o bd
  password: "00000000000", //a senha associada ao usuário
  database: "00000000000", //indica o nome do banco de dados que desejo acessar
};

const execSQLQuery = (sqlQry, id, res) => { //execSQLQuery -> exemplo de como executar consultas SQL no banco de dados, essa função está recebendo três valores: sqlQry -> consulta sql que quero execultar, id -> id usado para fazer a consulta, res -> objeto de resposta http que será usado para enviar os resultados da pesquisa
  const connection = mysql.createConnection(db); //aqui está sendo criado uma conexão com o banco de dados, passando como paramentro os dados dentro da constante anterior chaamda db

  connection.query(sqlQry, id, (error, results, fields) => { //usando o metodo query para executar a consulta sql especificada em sqlqry; o argumento id é usado como parametro de consulta, o callback (error, results, fields) é chamado quando a consulta é concluida, o erro será capturado, irá pegar os resultados e informaçõe sobre os campos retornados pela consulta 
    if (error) res.json(error); //se houver erro envia um json como resposta
    else res.json(results); //caso contrário, envia os resultados como resposta json

    connection.end(); //encerra a conexão com o banco de dados após a consulta
    console.log("Executou: execSQLQuery"); //por fim registra uma mensagem falando que a função foi executada
  });
};

async function resultSQLQuery(sqlQry, id) { //essa é uma função assíncrona, permitindo o uso do await para aguardar operações assíncronas, como criação de banco de dados
  const connection = await mysql.createConnection(db); //criando conexão com o banco de dados usando informações definidas em db
  let [result] = await connection.promise().query(sqlQry, id); //uso do método query para execultar a consulta sql, que é armazenado em uma varável
  try { //tentando retornar no resultado da consulta, caso aconteca algum erro ele é pego no catch
  return result;
  } catch (error) {
  console.log("Erro: "+error); //é registrado o erro no console e ele é lançado novamente para ser tratado
  throw error;
  }
} 


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/usuarios", (req, res) => {
  const id = []; //criando uma variável id e criando um array vazio
  execSQLQuery("SELECT * FROM usuario", id, res); //chamando a função que foi definida antes, passando o que quero consultar
});

app.get('/usuarios/:id', (req, res) => {
  const id =[req.params.id];
  execSQLQuery ('SELECT * FROM usuario WHERE usu_id=?', id, res);
})

app.put('/atualiza/:id', (req, res) => {
   const id = [req.body.nome, req.body.email, req.body.senha, req.params.id];
  execSQLQuery('UPDATE usuario SET usu_nome=?, usu_email=?, usu_senha=? WHERE usu_id=?', id, res)
})

app.delete('/delete/:id', (req, res) => {
  const id = [req.params.id];
  execSQLQuery('DELETE FROM usuario WHERE usu_id=?', id, res)
})

app.post("/usuarios", (req, res) => {
  const id = [req.body.nome, req.body.email, req.body.senha];
  execSQLQuery("INSERT INTO usuario VALUES (null, ?, ?, ?)", id, res);
});

app.post('/login', async (req,res) => {
    const id = [req.body.email, req.body.senha];
    let [result] = await resultSQLQuery('SELECT * FROM usuario WHERE usu_email=? and usu_senha=?',id);
    console.log(result)
    if(result)
        res.json({"id": result.usu_id, "mensagem":"Usuário válido"})
      
    else{
        res.json({"mensagem":"Usuário Inválido"})
    }
    console.log(result)

})

  

app.listen(port, () => {
  console.log("App escutando a porta: ${port}");
});
