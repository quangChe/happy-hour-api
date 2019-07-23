const env = require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const schema = require('./schema');
const express = require('express');
const routeHandler = require('./routes');
const expressGraphQL = require('express-graphql');

const app = express();
const db = require('./mongo');


// MySQL Startup:
// --------------
// const mysql = require('mysql');
// const db = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : process.env.MYSQL_PW,
//   database : 'happy_hour',
// });

// db.connect((err) => err ? console.log(err) : console.log('MySQL connected!'));


// db.query(`SHOW TABLES LIKE 'users'`, (err, res, fields) => {
//   if (!res.length) 
//     db.query(`CREATE TABLE users (id VARCHAR(20), firstName VARCHAR(15), age INT)`, (err, res, fields) => {
//       const mockData = `
//         ("1", "Abraham", "36"),
//         ("2", "Bill", "27"),
//         ("3", "Samantha", "28"),
//         ("4", "John", "34"),
//         ("5", "Rowland", "32")
//       `;
//       return db.query(`INSERT INTO users(id, firstName, age) VALUES ${mockData}`);
//     });
// });

// db.query(`SHOW TABLES LIKE 'favorites'`, (err, res, fields) => {
//   if (!res.length) {
//     db.query(`CREATE TABLE favorites (id VARCHAR(20), name VARCHAR(15), description VARCHAR(255))`, (err, res, fields) => {
//       const mockData = `
//         ("1", "Mike's Brewery", "A local favorite microbrewery with some of the best IPA's"),
//         ("2", "Leche de Agave", "Newest dive bar featuring exotic latin cocktails made"),
//         ("3", "Totem Spike", "Wear your Hawaiian shirts and experience an island getaway with 100+ tropical cocktails"),
//         ("4", "Board & Brew", "Delicious sandwiches and a long list of beers"),
//         ("5", "AJ Sports Bar", "Wings, beer and 80+ big screen TV's featuring 10+ different sports networks")
//       `;

//       return db.query(`INSERT INTO favorites(id, name, description) VALUES ${mockData}`);
//     });
//   }
// }) 

// db.end();





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