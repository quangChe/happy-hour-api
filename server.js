const env = require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const schema = require('./schema');
const express = require('express');
const routeHandler = require('./routes');
const expressGraphQL = require('express-graphql');

const app = express();


// MongoDB Startup:
// -------------------
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true })
// const Test = mongoose.model('Test', new mongoose.Schema({name: String}));

// MySQL Startup:
// --------------
const mysql = require('mysql');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : process.env.MYSQL_PW,
  database : 'happy_hour',
});

db.connect((err) => err ? console.log(err) : console.log('MySQL connected!'));
db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


db.end();

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