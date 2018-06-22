var express = require('express');
var router = express.Router();
var fs = require('fs');
var filePath = __dirname + '/program.json';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/program-request', function(req, res, next) {
  console.log("program",req.body)
    fs.writeFile(filePath, JSON.stringify(req.body), 'utf8',()=>{
    console.log("program success")
  });
});

module.exports = router;
