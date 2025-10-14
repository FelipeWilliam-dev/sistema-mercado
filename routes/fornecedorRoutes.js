const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

router.get('/', fornecedorController.listarFornecedores);

router.get('/novo', fornecedorController.mostrarFormularioNovo);

router.post('/novo', fornecedorController.criarFornecedor);

router.get('/editar/:id', fornecedorController.mostrarFormularioEditar);

router.post('/editar/:id', fornecedorController.atualizarFornecedor);

router.post('/excluir/:id', fornecedorController.excluirFornecedor);


module.exports = router;