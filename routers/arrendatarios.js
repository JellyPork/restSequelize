const express = require('express');
const router = express.Router();

// Import the controller functions
const {
  createArrendatario,
  getArrendatarios,
  getArrendatario,
  updateArrendatario,
  deleteArrendatario
} = require('../controllers/arrendatarioController');

router.post('/', createArrendatario);
router.get('/', getArrendatarios);
router.get('/:id', getArrendatario);
router.put('/:id', updateArrendatario);
router.delete('/:id', deleteArrendatario);

module.exports = router;
