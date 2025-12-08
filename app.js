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
 
 //Body Parser
 app.use(bodyParser.urlencoded({extended: false}))//Configura o body-parser para analisar dados codificados em URL (formulários HTML).

 //Handlebars
 app.set('views', path.join(__dirname, 'views'));//Define o diretório onde os arquivos de visualização (templates) estão localizados.
 app.engine('handlebars',exphbs.engine({defaultLayout: 'main'}));//Configura o motor de templates Handlebars, definindo 'main' como o layout padrão.
 app.set('view engine', 'handlebars');//Define Handlebars como o motor de visualização padrão para a aplicação.

 //static folder
 app.use(express.static(path.join(__dirname, 'public')));//Configura a pasta 'public' como o diretório para arquivos estáticos (CSS, JS, imagens, etc.).
    
   //db Connection
db.authenticate()
.then(() =>{
    console.log('conectou ao banco com sucesso');
} )//Se a autenticação for bem-sucedida, imprime uma mensagem de sucesso no console.
.catch(err =>{
    console.log('Ocorreu um erro ao se conectar: ',err);
})//Se houver um erro durante a autenticação, imprime uma mensagem de erro no console.


    //routes
    app.get('/', (req, res) => {
        

        let search = req.query.job;
        let query = '%'+search+'%';//Coloca o caractere curinga % antes e depois da string de busca para permitir buscas parciais.

        if(!search){
            job.findAll({order:[
            ['createdAt','DESC']
        ]})
        .then(jobs => {
            
            res.render('index',{
                jobs
            });
        })
        .catch(err => console.log(err)); 
        } else{
            job.findAll({
                where:{title:{[Op.like] :query}}, //Usa o operador LIKE para buscar títulos que contenham a string de busca.
                order:[
            ['createdAt','DESC']
        ]})
        .then(jobs => {
            
            res.render('index',{
                jobs, search 
            });
        })
        .catch(err => console.log(err));
        }
        

});//Renderiza a visualização 'index' quando a rota raiz ('/') é acessada.

 //jobs routes
 app.use('/jobs', RoutesJobs);//Usa as rotas definidas no arquivo 'routes/jobs.js' para qualquer requisição que comece com '/jobs'.
 
 