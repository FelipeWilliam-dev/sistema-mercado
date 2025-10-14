const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Fornecedor = require('./Fornecedor'); 

const Produto = sequelize.define('Produto', {
    id_prod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_prod' 
    },
    nome_prod: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'nome_prod'
    },
    preco_prod: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'preco_prod'
    },
    descricao_prod: {
        type: DataTypes.TEXT,
        field: 'descricao_prod'
    },
    codigo_barras: {
        type: DataTypes.STRING(100),
        unique: true,
        field: 'codigo_barras'
    },
    qtd_estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'qtd_estoque'
    },
    unidade_medida: {
        type: DataTypes.STRING(10),
        field: 'unidade_medida'
    },

    // chave estrangeira
    id_fornecedor: {
        type: DataTypes.INTEGER,
        references: {
            model: Fornecedor,
            key: 'id_fornecedor'
        }
    }
}, {
    tableName: 'cad_prod',
    timestamps: false
});

Produto.belongsTo(Fornecedor, { foreignKey: 'id_fornecedor' });
Fornecedor.hasMany(Produto, { foreignKey: 'id_fornecedor' });


module.exports = Produto;