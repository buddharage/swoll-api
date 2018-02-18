const graphql = require('graphql');

const graphqlTools = require('graphql-tools');
const isValidDate = require('date-fns/is_valid');

// DB models
const Session = require('../mongoose/session');
const Exercise = require('../mongoose/exercise');

// GraphQL type definitions
const typeDefs = require('./types');

// GraphQL resolvers
const resolvers = {
  Query: {
    session: async (source, { date }) => {
      const query = date
        ? {
          date: { $regex: `${date}.*` }
        }
        : {};

      const res = await Session.find(query);
      return res;
    }
  },
  Mutation: {
    addExercise: async (source, { name }) => {
      const res = await Exercise.create({ name });
      return res;
    },
    addSet: async (source, { activityId, reps, weight }) => {
      const res = await Session.findOneAndUpdate(
        {
          'activities._id': activityId
        },
        {
          $push: {
            'activities.$.sets': {
              reps,
              weight
            }
          }
        },
        { new: true }
      );

      return res;
    },
    addActivity: async (source, { sessionId, exerciseId }) => {
      const res = await Session.findOneAndUpdate(
        {
          _id: sessionId
        },
        {
          $push: {
            activities: {
              exerciseId,
              sets: []
            }
          }
        },
        { new: true }
      );

      return res;
    },
    addSession: async (source, { date }) => {
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
    }
  }
};

module.exports = graphqlTools.makeExecutableSchema({
  typeDefs,
  resolvers
});
