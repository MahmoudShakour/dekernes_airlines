var express = require('express');
const authToken = require('../middlewares/AuthToken');
var router = express.Router();

/* GET home page. */
router.get('/',authToken, function(req, res, next) {
  res.json({ title: 'Expqqqress' });
});

module.exports = router;
