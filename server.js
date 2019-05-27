require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path');
const routeHandler = require('./routes');

// app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
})

app.use('/api', routeHandler);

app.use('*', (req, res) => {
  res.status(400).send('Bad Request');
})

app.listen(9000, process.env.HOSTNAME,
  () => console.log('Now listening on port 9000.'))