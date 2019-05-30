require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path');
const routeHandler = require('./routes');
const mongoose = require('mongoose');

// app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true })

const Test = mongoose.model('Test', new mongoose.Schema({name: String}));

// Test.create({name: 'Testing123'})
//   .then(data => console.log(data))
//   .catch(err => console.error(err))

Test.findOne()
  .then(data => console.log('Data found???', data.name === 'Testing123'))
  .catch(err => console.error(err))

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