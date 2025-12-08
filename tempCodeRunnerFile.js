    const express = require('express');//importando o express
    const exphbs = require('express-handlebars');//Importa a biblioteca express-handlebars, o motor de templates usado para renderizar páginas HTML dinâmicas.
    const app = express();//Inicia uma nova aplicação Express.
    const path = require('path');//Importa o módulo nativo path do Node.js, usado para trabalhar com caminhos de arquivos e diretórios de forma segura e consistente.
    const port = 3000;//Define a porta na qual o servidor irá escutar as requisições.
    const db = require('./db/connection');//Importa o módulo de conexão com o banco de dados.
    const bodyParser = require('body-parser');//Importa o middleware body-parser, que é usado para analisar o corpo das requisições HTTP.
    const RoutesJobs = require('./routes/jobs');//Importa as rotas relacionadas a "jobs" de um arquivo separado.
    const job = require('./models/Job');//Importa o modelo Job, que provavelmente representa uma tabela no banco de dados.
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;
    

 app.listen(port, () => {     
 console.log(`o Express está rodando na porta ${port}`);
 });//Inicia o servidor na porta especificada e imprime uma mensagem no console quando o servidor estiver rodando.
 