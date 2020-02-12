const env = require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const schema = require('./schema');
const express = require('express');
const routeHandler = require('./routes');
const expressGraphQL = require('express-graphql');

const app = express();
const db = require('./mysql');

db.start(); // mysql
// db.test(); // mongodb

const headers = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
}


app.use(express.static(path.join(__dirname, 'public')));
app.use(headers);
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));


app.use('/api', routeHandler);
app.use('/graphql', expressGraphQL({ graphiql: true, schema }));
app.use('*', (req, res) => res.status(400).send('Bad Request'));

app.listen(9000, process.env.HOSTNAME,
  () => console.log('Now listening on port 9000.'))