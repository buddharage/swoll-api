const graphqlTools = require('graphql-tools');

// DB models
const Category = require('../mongoose/category');
const Exercise = require('../mongoose/exercise');
const Session = require('../mongoose/session');

// GraphQL type definitions
const typeDefs = require('./types');

// GraphQL resolvers
const resolvers = {
  Query: {
    session: Session.find,
    sessions: Session.find,
    exercise: Exercise.find,
    exercises: Exercise.find,
    categories: Category.find,
    category: Category.find
  },
  Mutation: {
    addActivity: async (source, { sessionId, exerciseId }) => {
      const res = await Session.model.findOneAndUpdate(
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
    addCategory: Category.add,
    addExercise: Exercise.add,
    addSession: Session.add,
    addSet: async (source, { activityId, reps, weight }) => {
      const res = await Session.model.findOneAndUpdate(
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
    updateExercise: Exercise.update
  }
};

module.exports = graphqlTools.makeExecutableSchema({
  typeDefs,
  resolvers
});
