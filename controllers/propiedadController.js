const models = require('../models');

const createPropiedad = async (req, res) => {
  try {
    const { cve, desc, dir } = req.body;

    const propiedad = await models.Propiedad.create({
      cve_catastral: cve,
      descripcion: desc,
      direccion: dir
    });

    res.json(propiedad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPropiedades = async (req, res) => {
  try {
    const propiedades = await models.Propiedad.findAll();
    res.json(propiedades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPropiedad = async (req, res) => {
  try {
    const propiedad = await models.Propiedad.findOne({
      where: { cve_catastral: req.params.id }
    });
    res.json(propiedad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePropiedad = async (req, res) => {
  try {
    const { cve, desc, dir } = req.body;

    const propiedad = await models.Propiedad.findOne({
      where: { cve_catastral: req.params.id }
    });

    propiedad.set('cve_catastral', cve);
    propiedad.set('descripcion', desc);
    propiedad.set('direccion', dir);

    await propiedad.save();
    res.json({ message: 'Propiedad actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePropiedad = async (req, res) => {
  try {
    const propiedad = await models.Propiedad.findOne({
      where: { cve_catastral: req.params.id }
    });

    await models.Arrendatario.destroy({
      where: { propiedadId: propiedad.id }
    });

    await models.Propietario.destroy({
      where: { propiedadId: propiedad.id }
    });

    await models.Propiedad.destroy({
      where: { cve_catastral: req.params.id }
    });

    res.json({ message: 'Propiedad eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPropiedad,
  getPropiedades,
  getPropiedad,
  updatePropiedad,
  deletePropiedad
};
