const users = require("./users.json");

("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersWithoutUrl = users.map(({ url, ...user }) => user);
    await queryInterface.bulkInsert("Users", usersWithoutUrl);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
