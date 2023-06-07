const express = require('express');
const router = express.Router();

// Import the controller functions
const {
  createPropietario,
  getPropietarios,
  getPropietario,
  updatePropietario,
  deletePropietario
} = require('../controllers/propietarioController');

router.post('/', createPropietario);
router.get('/', getPropietarios);
router.get('/:id', getPropietario);
router.put('/:id', updatePropietario);
router.delete('/:id', deletePropietario);

module.exports = router;
