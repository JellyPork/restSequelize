const models = require('../models');

const createPropietario = async (req, res) => {
  try {
    const { personaId, propiedadId } = req.body;

    // Verificar si la persona y la propiedad existen
    const persona = await models.Persona.findByPk(personaId);
    const propiedad = await models.Propiedad.findByPk(propiedadId);

    if (!persona || !propiedad) {
      return res.status(404).json({ message: 'No se encontró la persona o la propiedad' });
    }

    const propietario = await models.Propietario.create({
      personaId: personaId, // Asegúrate de tener solo una instancia de personaId aquí
      propiedadId: propiedadId
    });

    res.json(propietario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getPropietarios = async (req, res) => {
  try {
    const propietarios = await models.Propietario.findAll({
      include: [
        {
          model: models.Persona,
          as: 'persona',
        },
        {
          model: models.Propiedad,
          as: 'propiedad',
        },
      ]
    });

    res.json(propietarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getPropietario = async (req, res) => {
  try {
    const propietario = await models.Propietario.findOne({
      where: { id: req.params.id },
      include: [
        { model: models.Persona, as: 'persona' },
        { model: models.Propiedad, as: 'propiedad' }
      ]
    });

    res.json(propietario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePropietario = async (req, res) => {
  try {
    const { personaId, propiedadId } = req.body;

    const propietario = await models.Propietario.findOne({
      where: { id: req.params.id }
    });

    propietario.set('personaId', personaId);
    propietario.set('propiedadId', propiedadId);

    await propietario.save();
    res.json({ message: 'Propietario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePropietario = async (req, res) => {
  try {
    const propietario = await models.Propietario.findOne({
      where: { id: req.params.id }
    });

    await propietario.destroy();

    res.json({ message: 'Propietario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPropietario,
  getPropietarios,
  getPropietario,
  updatePropietario,
  deletePropietario
};
