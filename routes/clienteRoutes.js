const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listarClientes);

router.get('/novo', clienteController.mostrarFormularioNovo);

router.post('/novo', clienteController.criarCliente);

router.get('/editar/:id', clienteController.mostrarFormularioEditar);

router.post('/editar/:id', clienteController.atualizarCliente);

router.post('/excluir/:id', clienteController.excluirCliente);

module.exports = router;