const express = require('express');
const mongoose = require('mongoose');
const { dbAddress } = require('./config');
const bodyParser = require('body-parser');
const apolloServerExpress = require('apollo-server-express');

const { graphqlExpress, graphiqlExpress } = apolloServerExpress;

const schema = require('./graphql/schema');

const app = express();

mongoose.connect(dbAddress);

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
