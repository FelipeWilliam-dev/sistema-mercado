const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/', produtoController.listarProdutos);
router.get('/novo', produtoController.mostrarFormularioNovo);
router.post('/novo', produtoController.criarProduto);
router.get('/editar/:id', produtoController.mostrarFormularioEditar);
router.post('/editar/:id', produtoController.atualizarProduto);
router.post('/excluir/:id', produtoController.excluirProduto);

module.exports = router;