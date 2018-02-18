const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model(
  'exercise',
  new Schema(
    {
      name: String
    },
    {
      collection: 'Exercises'
    }
  )
);
