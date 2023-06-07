const express = require('express');
const router = express.Router();

// Import the controller functions
const {
  createPropiedad,
  getPropiedades,
  getPropiedad,
  updatePropiedad,
  deletePropiedad
} = require('../controllers/propiedadController');

router.post('/', createPropiedad);
router.get('/', getPropiedades);
router.get('/:id', getPropiedad);
router.put('/:id', updatePropiedad);
router.delete('/:id', deletePropiedad);

module.exports = router;
