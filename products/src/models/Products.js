
const products = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    name: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING,
    },
  });

  Products.associate = (models) => {
  };

  return Products;
};

export default products;
