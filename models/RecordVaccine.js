const {DataTypes } = require('sequelize')
const db = require('../db/conn')

// User
const User = require("./User")
// Vaccine
const Vaccine = require("./Vaccine")

const RecordVaccine = db.define("RecordVaccine", {
    data_aplicacao: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    dose: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    }
}, {
  tableName: 'registro_vacinas',
  timestamps: true,
  underscored: false,
  createdAt: 'created_at',
  updatedAt: false
})
  
// Definindo os relacionamentos entre as entidades
RecordVaccine.belongsTo(User, { foreignKey: "usuario_id" })
User.hasMany(RecordVaccine, { foreignKey: "usuario_id" })

RecordVaccine.belongsTo(Vaccine, { foreignKey: "vacina_id" })
Vaccine.hasMany(RecordVaccine, { foreignKey: "vacina_id" })

module.exports = RecordVaccine