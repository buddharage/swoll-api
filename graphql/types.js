module.exports = `
  type Exercise {
    _id: String!
    name: String!
    categories: [Category]
  }

  type Category {
    _id: String!
    name: String!
  }

  type Session {
    _id: String
    date: String!
    activities: [Activity]
  }

  type Set {
    weight: Int
    reps: Int
  }

  type Activity {
    exerciseId: String
    sets: [Set]
  }

  type Query {
    categories: [Category]
    category(id: String): [Category]
    exercise(id: String): [Exercise]
    exercises: [Exercise]
    session(date: String): [Session]
    sessions: [Session]
  }

  type Mutation {
    addExercise(name: String!): Exercise

    updateExercise(id: String!, categories: [String]): Exercise

    addCategory(name: String!): Category

    addSet(
      activityId: String!
      weight: Int!
      reps: Int!
    ): Session

    addActivity(
      exerciseId: String!
      sessionId: String!
    ): Session

    addSession(date: String!): Session
  }
`;
