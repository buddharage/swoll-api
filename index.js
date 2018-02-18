const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apolloServerExpress = require('apollo-server-express');

const { graphqlExpress, graphiqlExpress } = apolloServerExpress;

const schema = require('./graphql/schema');

const app = express();

let mongoUserCredentials = '';

if (process.env.MONGO_USER && process.env.MONGO_PASSWORD) {
  mongoUserCredentials = `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`;
}

const MONGO_URL = process.env.MONGO_URL || 'localhost:27017';
const DB_NAME = process.env.MONGO_DB_NAME || 'swoll';
const MONGO_CONNECTION_STRING = `mongodb://${mongoUserCredentials}${MONGO_URL}/${DB_NAME}`;

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
