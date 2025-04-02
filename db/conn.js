// Conexão com o Banco de Dados MySQL
require('dotenv').config();
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'mysql'
    }
  )

try {
    sequelize.authenticate()
    console.log('Conexão realizada com sucesso!')

} catch(err) {
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize