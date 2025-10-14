const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_usuario: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    login: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tipo_acesso: {
        type: DataTypes.ENUM('admin', 'vendedor'),
        allowNull: false
    },
    ativo: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    }
}, {
    tableName: 'cad_usuario',
    timestamps: false
});

module.exports = Usuario;