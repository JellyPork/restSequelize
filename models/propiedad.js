'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Propiedad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Propiedad.hasMany(models.Propietario, { foreignKey: 'propiedadId', as: 'propietarios' });
      models.Propiedad.belongsTo(models.Arrendatario, {
        foreignKey: 'propiedadId',
        as: 'arrendatario'
      });


    }
  }
  Propiedad.init({

    cve_catastral: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Propiedad',
    tableName: 'Propiedades',
    name: {
      singular:'propiedad',
      plural: 'propiedades'
    }
  });
  return Propiedad;
};
