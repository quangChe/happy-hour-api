const router = require('express').Router();
const businesses = require('../controllers/businesses');

router.get('/businesses/search', businesses.search);
router.get('/businesses/:id', businesses.getById);

module.exports = router;