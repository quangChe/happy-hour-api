require('dotenv').config();
const express = require('express')
const app = express();
const axios = require('axios');
const YelpKey = process.env.YELP_API_KEY;
const path = require('path');
const rootDir = (file='') => path.join(__dirname, '..', 'app', 'build', file);

app.use(express.static(rootDir()));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
})

app.get('/list/businesses', async (req, res) => {
  const url = `https://api.yelp.com/v3/businesses/search?${req.query.search}`;
  const headers = {'Authorization': YelpKey};
  const yelp = await axios.get(url, {headers});
  res.status(200).send(yelp.data.businesses);
})

app.get('/*', async (req, res) => {
  res.status(200).sendFile(rootDir('index.html'))
})

app.use('*', (req, res) => {
  res.status(400).send('Bad Request');
})

app.listen(9000, () => console.log('Now listening on port 9000.'))