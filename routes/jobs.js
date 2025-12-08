const express = require('express');
const Router = express.Router();
const job = require('../models/Job'); 


Router.get('/test', (req, res) => {
    res.send('Rota de teste funcionando');
});

//ver datalhe da vaga
Router.get('/view/:id', (req, res) => job.findOne({
        where:{id: req.params.id}
    }).then(job => {
        res.render('view',{
            job
        });
       
    }).catch(err => console.log(err)));



Router.get('/add', (req, res) => {
    res.render('add');
});

//add via post 
Router.post('/add',(req,res) =>{
    let {title,salary,company,description, email, new_job} = req.body;
    //inserir dados na tabela
    job.create({
       title, 
       description,
       salary,
       company,
       email,
       new_job
})
.then(() => res.redirect('/')) 
.catch(err => console.log(err));
})

// Deletar a vaga

Router.post('/delete/:id', (req, res) => {
    const jobId = req.params.id; // Pega o ID da URL

    job.destroy({
        where: { id: jobId } // Encontra e deleta o registro com o ID correspondente
    })
    .then(() => {
        console.log(`Vaga com ID ${jobId} deletada com sucesso.`);
        res.redirect('/'); // Redireciona para a página principal após a exclusão
    })
    .catch(err => console.log("Erro ao deletar a vaga: ", err));
});

module.exports = Router;



/*Router.post('/delete/:id', (req, res) => {
    // Pega o ID da vaga pelos parâmetros da URL
    const jobId = req.params.id;

    // Usa o método 'destroy' do Sequelize para deletar o registro
    job.destroy({
        where: { id: jobId }
    })
    .then(() => {
        // Redireciona para a página principal após a exclusão
        res.redirect('/');
    })
    .catch(err => console.log(err));
});*/