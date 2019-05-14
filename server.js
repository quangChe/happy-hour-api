require('dotenv').config();
const express = require('express')
const app = express();
const axios = require('axios');
const path = require('path');
const YelpKey = process.env.YELP_API_KEY;
const rootDir = (file='') => path.join(__dirname, '..', 'app', 'build', file);
app.use(express.static(rootDir()));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
})

app.get('/api/businesses/search', async (req, res) => {
  if (!req.query.q) {
    return res.status(400).send('Invalid query provided.');
  }
  
  try {
    const url = `https://api.yelp.com/v3/businesses/search?${req.query.q}`;
    const headers = {'Authorization': YelpKey};
    const yelp = await axios.get(url, {headers});
    return res.status(200).send(yelp.data.businesses);
  } catch (err) {
    console.error(err);
    const status = err.response.status || 500;
    const message = err.response.data.error.description || 'Unexpected error';
    return res.status(status).send(message);
  }
})

app.get('/api/businesses/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const url = `https://api.yelp.com/v3/businesses/${id}`;
    const headers = {'Authorization': YelpKey};
    const yelp = await axios.get(url, {headers});
    return res.status(200).send(yelp.data);
  } catch(err) {
    const status = err.response.status || 500;
    const message = err.response.data.error.description || 'Unexpected error';
    return res.status(status).send(message);
  }
}) 

app.get('/app/*', async (req, res) => {
  res.status(200).sendFile(rootDir('index.html'))
})

app.use('*', (req, res) => {
  res.status(400).send('Bad Request');
})

app.listen(9000, () => console.log('Now listening on port 9000.'))