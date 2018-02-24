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
    notes: String
  }

  type Set {
    _id: String!
    weight: Int
    reps: Int,
    duration: Int
  }

  type Activity {
    _id: String!
    exerciseId: String
    sets: [Set]
  }

  type Query {
    categories: [Category]
    category(id: String): [Category]
    exercise(id: String): [Exercise]
    exercises: [Exercise]
    session(id: String): [Session]
    sessions: [Session]
  }

  type Mutation {
    addExercise(name: String!): Exercise

    updateExercise(id: String!, categories: [String]): Exercise

    addCategory(name: String!): Category

    addSet(
      activityId: String!
      weight: Int!
      reps: Int,
      duration: Int
    ): Session

    addActivity(
      exerciseId: String!
      sessionId: String!
    ): Session

    addSession(date: String!): Session
  }
`;
