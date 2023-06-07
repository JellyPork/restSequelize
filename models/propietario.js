'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Propietario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Propietario.belongsTo(models.Persona, { foreignKey: 'personaId', as: 'persona' });
      models.Propietario.belongsTo(models.Propiedad, { foreignKey: 'propiedadId', as: 'propiedad' });
    }
  }
  Propietario.init({
    personaId: DataTypes.NUMBER,
    propiedadId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Propietario',
  });
  return Propietario;
};
