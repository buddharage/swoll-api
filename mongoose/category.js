const mongoose = require('mongoose');

const { Schema } = mongoose;

const Category = mongoose.model(
  'category',
  new Schema(
    {
      name: String
    },
    {
      collection: 'Categories'
    }
  )
);

exports.add = async (source, { name }) => {
  const res = await Category.create({ name });
  return res;
};

exports.find = async (source, { id }) => {
  const query = id
    ? {
      id
    }
    : {};

  const res = await Category.find(query);
  return res;
};

exports.model = Category;
