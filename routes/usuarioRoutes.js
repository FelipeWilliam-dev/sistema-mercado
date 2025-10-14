const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.listarUsuarios);
router.get('/novo', usuarioController.mostrarFormularioNovo);
router.post('/novo', usuarioController.criarUsuario);

module.exports = router;