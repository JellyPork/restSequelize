'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Arrendatario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Arrendatario.belongsTo(models.Persona, { foreignKey: 'personaId', as: 'persona' });
      models.Arrendatario.hasMany(models.Propiedad, {
      foreignKey: 'propiedadId',
      as: 'propiedades'
    });


    }
  }
  Arrendatario.init({
    personaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    propiedadId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
    {
    sequelize,
    modelName: 'Arrendatario',
  });
  return Arrendatario;
};
