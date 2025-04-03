const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const User = db.define('User', {
  name: {  
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {  
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 255] 
      }
    }
}, {
tableName: 'usuarios',
timestamps: true, 
underscored: false, 
createdAt: 'created_at', 
updatedAt: false 
})

module.exports = User