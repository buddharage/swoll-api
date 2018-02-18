module.exports = `
  type Exercise {
    _id: String
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
    sessions(date: String): [Session]
  }

  type Mutation {
    addExercise(name: String!): Exercise

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
