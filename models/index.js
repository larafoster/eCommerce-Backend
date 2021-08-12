// import models
const Product = require ('./Product');
const Category = require ('./Category');
const Tag = require ('./Tag');
const ProductTag = require ('./ProductTag');

Product.belongsTo (Category, {
  //`Product` belongs to `Category`
  foreignKey: 'category_id', //references model category
  onDelete: 'CASCADE', //if category is deleted so is product
});
Category.hasMany (Product, {
  //`Category` has many `Product` models
  foreignKey: 'category_id',
});
Product.belongsToMany (Tag, {
  //`Product` belongs to many `Tag` models
  through: ProductTag, //Allow products to have multiple tags and tags to have many products by using the `ProductTag` through model
  foreignKey: 'product_id',
});
Tag.belongsToMany (Product, {
  //`Tag` belongs to many `Product` models
  through: ProductTag,
  foreignKey: 'tag_id',
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
