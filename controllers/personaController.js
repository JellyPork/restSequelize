const models = require('../models');



const createPersona = async (req, res) => {
    try {
        const { rfc, nombre } = req.body;

        const newPersona = await models.Persona.create({
            rfc,
            nombre
        });
        res.json({ message: 'Persona creada exitosamente' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPersonas = async (req, res) => {
  try {
      const personas = await models.Persona.findAll();

      res.json(personas);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const getPersona = async (req, res) => {
    try {

        const persona = await models.Persona.findOne({
            where: { rfc: req.params.id }
        });
        if (!persona) {
            res.status(404).json({ message: 'No person found with id' });
        }

        res.json(persona);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePersona = async (req, res) => {
    try {
        const { rfc, nombre } = req.body;
        const persona = await models.Persona.findOne({
            where: { rfc: req.params.id }
        });
        await persona.update({ rfc, nombre });
        res.json({ message: 'Actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deletePersona = async (req, res) => {
  try {
    const persona = await models.Persona.findOne({
            where: { rfc: req.params.id }
        });

    // Find and delete dependent rows in the propietarios and arrendatarios table
    await models.Arrendatario.destroy({
      where: { personaId: persona.id },
    });

    await models.Propietario.destroy({
      where: { personaId: persona.id },
    });

    // Delete the persona
    await models.Persona.destroy({
      where: { id: persona.id },
    });

    res.json({ message: 'Persona deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
    createPersona,
    getPersonas,
    getPersona,
    updatePersona,
    deletePersona,

};
