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
      models.Persona.belongsToMany(models.Propiedad, { through: models.Propietario, as: "propiedades" });
      models.Persona.hasOne(models.Arrendatario, { foreignKey: 'personaId' });
    }
  }
  Persona.init({
    rfc: {
      type: DataTypes.STRING,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,

    }
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};