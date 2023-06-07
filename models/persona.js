'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Persona.hasMany(models.Arrendatario, { foreignKey: 'personaId', as: 'arrendatarios' });
      models.Persona.hasMany(models.Propietario, { foreignKey: 'personaId', as: 'propietarios' });

    }
  }
  Persona.init({
    rfc: {
      type: DataTypes.STRING,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};
