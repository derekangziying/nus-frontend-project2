var bankname = ["UBS Bank,UOB Bank,DBS Bank,OCBC Bank,May Bank"];

const dataset2 = "UBS Bank,UOB Bank,DBS Bank,OCBC Bank,May Bank"

var express = require('express'); 
var router = express.Router();    

router.get('/', function(req, res, next) {
	res.send(dataset2);
  });

module.exports = router;
