var balances = [50,60,70,80,90];

const dataset1 = "50,60,70,80,90"

var express = require('express'); 
var router = express.Router();    

router.get('/', function(req, res, next) {
	res.send(dataset1);
  });

module.exports = router;
