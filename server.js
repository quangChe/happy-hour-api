require('dotenv').config();
const app = require('express')();
const cors = require('cors');
const axios = require('axios');
const YelpKey = process.env.YELP_API_KEY;

app.get('/', cors(), async (req, res) => {
    const url = 'https://api.yelp.com/v3/businesses/search?term=happy+hour&location=1131+wass+st';
    const headers = {
      'Authorization': YelpKey,
    }
    const yelp = await axios.get(url, {headers});
    res.status(200).send(yelp.data.businesses);
})

app.use((req, res, next) => {
  cors({origin: 'http://localhost:9000'});
  next();
})

app.listen(9000, () => console.log('Now listening on port 9000.'))