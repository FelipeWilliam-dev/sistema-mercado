const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fornecedor = sequelize.define('Fornecedor', {
    id_fornecedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_fornecedor: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING(18),
        unique: true
    },
    email_fornecedor: {
        type: DataTypes.STRING(100),
        unique: true
    },
    telefone_fornecedor: {
        type: DataTypes.STRING(20)
    },
    endereco: {
        type: DataTypes.STRING(255)
    },
    data_cadastro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {

    tableName: 'cad_fornecedores', 
    timestamps: false 
});

module.exports = Fornecedor;