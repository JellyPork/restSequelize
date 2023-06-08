'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const personas = await queryInterface.sequelize.query(
      'SELECT id FROM Personas;'
    );
    const propiedades = await queryInterface.sequelize.query(
      'SELECT id FROM Propiedades;'
    );

    const personaId = 1;
    const propiedadId = 1;

    await queryInterface.bulkInsert('Propietarios', [
      {
        personaId,
        propiedadId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Propietarios', null, {});
  },
};
