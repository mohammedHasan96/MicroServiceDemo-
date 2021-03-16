
export const productsId = (data) => data.id;
export const productsData = (data) => ({
  name: data.name,
  stock: data.stock,
  price: data.price,
  description: data.description,
});
