const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_cliente: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(14),
        unique: true
    },
    email_cliente: {
        type: DataTypes.STRING(100),
        unique: true
    },
    telefone_cliente: {
        type: DataTypes.STRING(20)
    },
    data_cadastro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'cad_cliente',
    timestamps: false 
});

module.exports = Cliente;