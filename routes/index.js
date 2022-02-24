var express = require('express');
var router = express.Router();

/* GET home page.  Server Page */
let serverShoeArray = [];

let shoeObject = function (aShoeName, aYear, aPrice, aURL ) {
   this.ID = Math.random().toString(16).slice(5)
   this.shoeName = aShoeName,
   this.year = aYear,
   this.price = aPrice;
   this.url = aURL;
}


serverShoeArray.push(new shoeObject("xTrue Blue 3's", 2019, 220, "url"));
serverShoeArray.push(new shoeObject("xBred 11s", 2013, 180, "url"));
serverShoeArray.push(new shoeObject("xFire Red 4's", 2012, 300, "url"));

console.log(serverShoeArray);

//if client comes to server with a "/", just send back index.html file back

router.get('/', function(req, res, next) {
  res.sendFile('index.html');
  //res.render('index', { title: 'Express' });
});

/* GET all Notes data */
router.get('/getAllShoes', function(req, res) {
  res.status(200).json(serverShoeArray);
});

 /* Pushing new data to server */
router.post('/AddShoe', function(req, res) {
  const newShoe = req.body;
  console.log(newShoe);
  serverShoeArray.push(newShoe);
  res.status(200);
});

module.exports = router;
