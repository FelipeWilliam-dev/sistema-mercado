const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Venda = require('./Venda');
const Produto = require('./Produto');

const ItemVenda = sequelize.define('ItemVenda', {
    id_item_venda: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    qtd_itens: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco_unitario_venda: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    // chaves Estrangeiras
    id_venda: {
        type: DataTypes.INTEGER,
        references: { model: Venda, key: 'id_venda' }
    },
    id_produto: {
        type: DataTypes.INTEGER,
        references: { model: Produto, key: 'id_prod' }
    }
}, {
    tableName: 'itens_venda',
    timestamps: false
});

Venda.hasMany(ItemVenda, { foreignKey: 'id_venda' });
ItemVenda.belongsTo(Venda, { foreignKey: 'id_venda' });

Produto.hasMany(ItemVenda, { foreignKey: 'id_produto' });
ItemVenda.belongsTo(Produto, { foreignKey: 'id_produto' });

module.exports = ItemVenda;