const graphqlTools = require('graphql-tools');

// DB models
const Session = require('../mongoose/session');
const Exercise = require('../mongoose/exercise');

// GraphQL type definitions
const typeDefs = require('./types');

// GraphQL resolvers
const resolvers = {
  Query: {
    sessions: async (source, { date }) => {
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
      const formatDate = new Date(date);
      let res = false;

      if (formatDate) {
        res = await Session.create({
          date: formatDate,
          activites: []
        });
      }

      return res;
    }
  }
};

module.exports = graphqlTools.makeExecutableSchema({
  typeDefs,
  resolvers
});
