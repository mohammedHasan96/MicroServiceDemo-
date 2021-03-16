

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [{
      name: 'product 1',
      stock: 50,
      price: 50.50,
      description: 'oh its a good product waw',
      createdAt: "1/1/2010",
      updatedAt: "1/1/2010",
    }, {
      name: 'product 2',
      stock: 60,
      price: 500.99,
      description: 'oh its a good product waw',
      createdAt: "1/1/2010",
      updatedAt: "1/1/2010",
    }, {
      name: 'product 3',
      stock: 60,
      price: 50.50,
      description: 'oh its a good product waw',
      createdAt: "1/1/2010",
      updatedAt: "1/1/2010",
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
