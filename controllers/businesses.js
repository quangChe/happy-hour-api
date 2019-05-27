const YelpKey = process.env.YELP_API_KEY;
const axios = require('axios');

module.exports = {
  search: async (req, res) => {
    if (!req.query.q) return res.status(400).send('Invalid query provided.');
  
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
  },

  getById: async (req, res) => {
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
  }
}