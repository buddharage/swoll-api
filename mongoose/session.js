const graphql = require('graphql');
const isValidDate = require('date-fns/is_valid');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const SetSchema = new Schema({
  weight: Number,
  reps: Number,
  duration: Number
});

const ActivitySchema = new Schema({
  exerciseId: {
    type: Schema.Types.ObjectId,
    ref: 'exercise'
  },
  sets: [SetSchema]
});

const Session = mongoose.model(
  'session',
  new Schema(
    {
      date: String,
      activities: [ActivitySchema],
      notes: String
    },
    {
      collection: 'Sessions'
    }
  )
);

exports.add = async (source, { date }) => {
  let res = false;
  const formattedDate = new Date(date);

  if (isValidDate(formattedDate)) {
    res = await Session.create({
      date: formattedDate,
      activites: []
    });
  } else {
    throw new graphql.GraphQLError('Date is not valid');
  }

  return res;
};

exports.find = async (source, { id }) => {
  const query = id
    ? {
        _id: id
      }
    : {};

  const res = await Session.find(query);
  return res;
};

exports.model = Session;
