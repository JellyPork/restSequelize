const models = require('../models');

const createArrendatario = async (req, res) => {
  try {
    const { personaId, propiedadId } = req.body;

    const arrendatario = await models.Arrendatario.create({ personaId,propiedadId });
    await models.Propiedad.update({ propiedadId: arrendatario.id }, { where: { id: propiedadId } });

    res.json(arrendatario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArrendatarios = async (req, res) => {
  try {
    const arrendatarios = await models.Arrendatario.findAll({
      include: [
        { model: models.Persona, as: 'persona' },
        { model: models.Propiedad, as: 'propiedades' }
      ]
    });

    res.json(arrendatarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArrendatario = async (req, res) => {
  try {
    const arrendatario = await models.Arrendatario.findOne({
      where: { id: req.params.id },
      include: [
        { model: models.Persona, as: 'persona' },
        { model: models.Propiedad, as: 'propiedad' }
      ]
    });

    res.json(arrendatario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateArrendatario = async (req, res) => {
  try {
    const { personaId, propiedadId } = req.body;

    const arrendatario = await models.Arrendatario.findOne({
      where: { id: req.params.id }
    });

    arrendatario.set('personaId', personaId);
    arrendatario.set('propiedadId', propiedadId);

    await arrendatario.save();
    res.json({ message: 'Arrendatario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteArrendatario = async (req, res) => {
  try {
    const arrendatario = await models.Arrendatario.findOne({
      where: { id: req.params.id }
    });

    await arrendatario.destroy();

    res.json({ message: 'Arrendatario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createArrendatario,
  getArrendatarios,
  getArrendatario,
  updateArrendatario,
  deleteArrendatario
};
