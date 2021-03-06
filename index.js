require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apolloServerExpress = require('apollo-server-express');

const { graphqlExpress, graphiqlExpress } = apolloServerExpress;

const schema = require('./graphql/schema');

const app = express();

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_URL,
  MONGO_DB_NAME,
  PORT
} = process.env;

const mongoUserCredentials =
  MONGO_USER && MONGO_PASSWORD ? `${MONGO_USER}:${MONGO_PASSWORD}@` : '';

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
app.listen(PORT || 8080, () => {
  console.log('Swoll is on patrol - server online');
});

app.use(cors());

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
