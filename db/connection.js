const Sequelize = require('sequelize');

// CONFIGURAÇÃO DO MYSQL
const sequelize = new Sequelize(
    'sistema_vagas_db', // 1. Nome do Banco de Dados
    'root',    // 2. Usuário (Geralmente 'root' para ambiente local)
    '5661',      // 3. Senha
    {
        host: 'localhost', // Onde o MySQL está rodando (pode ser um IP ou 'localhost')
        dialect: 'mysql',  // Define o dialeto como MySQL
        port: 3306,        // Porta padrão do MySQL (mantenha se não mudou)
        // Opcional: Para evitar warning no console
        define: {
            timestamps: true 
        },
        // Opcional: Configurações de pool de conexão
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);



module.exports = sequelize;