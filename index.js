require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apolloServerExpress = require('apollo-server-express');

const { graphqlExpress, graphiqlExpress } = apolloServerExpress;

const schema = require('./graphql/schema');

const app = express();

const {
  MONGO_USER, MONGO_PASSWORD, MONGO_URL, MONGO_DB_NAME
} = process.env;

const mongoUserCredentials = MONGO_USER && MONGO_PASSWORD ? `${MONGO_USER}:${MONGO_PASSWORD}@` : '';

const MONGO_CONNECTION_STRING = `mongodb://${mongoUserCredentials}${MONGO_URL}/${MONGO_DB_NAME}`;

mongoose.connect(MONGO_CONNECTION_STRING);

const db = mongoose.connection;

db.on('error', () => {
  console.log('DB Error');
});

db.once('open', () => {
  console.log('DB Connected');
});

// start the server
app.listen(8080, () => {
  console.log('+++Express Server is Running!!!');
});

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema
  })
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);
