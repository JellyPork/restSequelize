const express = require('express');
const router = express.Router();

// Import the controller functions
const {
    createPersona,
    getPersonas,
    getPersona,
    updatePersona,
    deletePersona
} = require('../controllers/personaController');

router.get('/:id', getPersona);
router.get('/', getPersonas);
router.post('/', createPersona);
router.put('/:id', updatePersona);
router.delete('/:id', deletePersona);


module.exports = router;
