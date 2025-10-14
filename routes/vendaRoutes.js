const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');

router.get('/', vendaController.listarVendas);

router.get('/nova', vendaController.mostrarFormularioNovaVenda);

router.post('/nova', vendaController.registrarVenda);

module.exports = router;