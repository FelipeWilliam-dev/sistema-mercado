const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');
const Usuario = require('./Usuario');

const Venda = sequelize.define('Venda', {
    id_venda: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valor_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    forma_pagamento: {
        type: DataTypes.STRING(45)
    },
    data_venda: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    // chaves Estrangeiras
    id_cliente: {
        type: DataTypes.INTEGER,
        references: { model: Cliente, key: 'id_cliente' }
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: { model: Usuario, key: 'id_usuario' }
    }
}, {
    tableName: 'cad_vendas',
    timestamps: false
});

Venda.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Cliente.hasMany(Venda, { foreignKey: 'id_cliente' });

Venda.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Usuario.hasMany(Venda, { foreignKey: 'id_usuario' });

module.exports = Venda;