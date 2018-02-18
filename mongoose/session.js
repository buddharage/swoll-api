const mongoose = require('mongoose');

const { Schema } = mongoose;

const SetSchema = new Schema({
  weight: Number,
  reps: Number
});

const ActivitySchema = new Schema({
  exerciseId: {
    type: Schema.Types.ObjectId,
    ref: 'exercise'
  },
  sets: [SetSchema]
});

module.exports = mongoose.model(
  'session',
  new Schema(
    {
      date: String,
      activities: [ActivitySchema]
    },
    {
      collection: 'Sessions'
    }
  )
);
