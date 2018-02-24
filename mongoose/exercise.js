const mongoose = require('mongoose');

const { Schema } = mongoose;

const Exercise = mongoose.model(
  'exercise',
  new Schema(
    {
      name: String,
      categories: [{ type: Schema.Types.ObjectId, ref: 'category' }]
    },
    {
      collection: 'Exercises'
    }
  )
);

exports.add = async (source, { name }) => {
  const res = await Exercise.create({ name, categories: [] });
  return res;
};

exports.find = async (source, { date }) => {
  const query = date
    ? {
        date: { $regex: `${date}.*` }
      }
    : {};

  const res = await Exercise.find(query);
  return res;
};

exports.update = async (source, { id, categories }) => {
  const res = await Exercise.findOneAndUpdate(
    {
      _id: id
    },
    {
      $push: {
        categories
      }
    },
    { new: true }
  );

  return res;
};

exports.model = Exercise;
