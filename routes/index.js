var express = require('express');
var router = express.Router();

/* GET home page.  Server Page */
serverShoeArray = [];

let shoeObject = function (aShoeName, aYear, aPrice, aURL ) {
   this.ID = Math.random().toString(16).slice(5)
   this.shoeName = aShoeName,
   this.year = aYear,
   this.price = aPrice;
   this.url = aURL;
}

//serverShoeArray.push(new shoeObject("True Blue 3's", 2019, 220, "https://www.google.com/search?q=true+blue+3s&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj90PSMgKj2AhVcFTQIHWYjBvUQ_AUoAXoECAEQAw#imgrc=d1Q6F6OytsNZMM"));
       //  serverShoeArray.push(new shoeObject("Bred 11s", 2013, 180, "https://www.google.com/search?q=bred+11s&tbm=isch&ved=2ahUKEwiut66ogKj2AhUGBjQIHTh-AtIQ2-cCegQIABAA&oq=bred+11s&gs_lcp=CgNpbWcQAzIICAAQgAQQsQMyBQgAEIAEMgQIABBDMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoGCAAQBxAeOgsIABCABBCxAxCDAToICAAQsQMQgwE6BAgAEAM6BwgAELEDEENQtAdYxBZgyBdoAHAAeACAAUCIAY0EkgECMTCYAQCgAQGqAQtnd3Mtd2l6LWltZ7ABAMABAQ&sclient=img&ei=HbAfYu60FIaM0PEPuPyJkA0#imgrc=YzcTLXkkRIhMtM"));
        // serverShoeArray.push(new shoeObject("Fire Red 4's", 2012, 300, "https://www.google.com/search?q=fire+red+4%27s&tbm=isch&ved=2ahUKEwjk5NWPgKj2AhVgIjQIHRpDC3wQ2-cCegQIABAA&oq=fire+red+4%27s&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjoECAAQQzoICAAQgAQQsQM6BwgAELEDEEM6CggAELEDEIMBEENQ0AVYkhNg9hNoAHAAeACAAUKIAYcFkgECMTOYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=6a8fYqTMIeDE0PEPmoat4Ac#imgrc=j0hJRVGLefHvdM"));


var fs = require("fs"); // bring in this supplied library code

// my code, embedded in an object
fileManager  = {
    read: function() {
      const stat = fs.statSync('shoesData.json');
      if (stat.size !== 0) {                           
      var rawdata = fs.readFileSync('shoesData.json'); // read disk file
      serverShoeArray = JSON.parse(rawdata);  // turn the file data into JSON format and overwrite our array
      }
    else {
  // make up 3 for testing
        serverShoeArray.push(new shoeObject("True Blue 3's", 2019, 220, "https://www.google.com/search?q=true+blue+3s&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj90PSMgKj2AhVcFTQIHWYjBvUQ_AUoAXoECAEQAw#imgrc=d1Q6F6OytsNZMM"));
        serverShoeArray.push(new shoeObject("Bred 11s", 2013, 180, "https://www.google.com/search?q=bred+11s&tbm=isch&ved=2ahUKEwiut66ogKj2AhUGBjQIHTh-AtIQ2-cCegQIABAA&oq=bred+11s&gs_lcp=CgNpbWcQAzIICAAQgAQQsQMyBQgAEIAEMgQIABBDMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoGCAAQBxAeOgsIABCABBCxAxCDAToICAAQsQMQgwE6BAgAEAM6BwgAELEDEENQtAdYxBZgyBdoAHAAeACAAUCIAY0EkgECMTCYAQCgAQGqAQtnd3Mtd2l6LWltZ7ABAMABAQ&sclient=img&ei=HbAfYu60FIaM0PEPuPyJkA0#imgrc=YzcTLXkkRIhMtM"));
        serverShoeArray.push(new shoeObject("Fire Red 4's", 2012, 300, "https://www.google.com/search?q=fire+red+4%27s&tbm=isch&ved=2ahUKEwjk5NWPgKj2AhVgIjQIHRpDC3wQ2-cCegQIABAA&oq=fire+red+4%27s&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjIECAAQHjoECAAQQzoICAAQgAQQsQM6BwgAELEDEEM6CggAELEDEIMBEENQ0AVYkhNg9hNoAHAAeACAAUKIAYcFkgECMTOYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=6a8fYqTMIeDE0PEPmoat4Ac#imgrc=j0hJRVGLefHvdM"));
        fileManager.write();
      }
        },
  write: function() {
  let data = JSON.stringify(serverShoeArray);    // take our object data and make it writeable
  fs.writeFileSync('shoesData.json', data);  // write it
  },
}


//if client comes to server with a "/", just send back index.html file back

router.get('/', function(req, res, next) {
  res.sendFile('index.html');
  
});

/* GET all Notes data */
router.get('/getAllShoes', function(req, res) {
  fileManager.read();
  res.status(200).json(serverShoeArray);
  
});

 /* Pushing new data to server */
router.post('/AddShoe', function(req, res) {
  const newShoe = req.body;
  console.log(newShoe);
  serverShoeArray.push(newShoe);
  fileManager.write();
 
  var response = {
    status  : 200,
    success : 'Updated Successfully'
  }
  res.end(JSON.stringify(response)); // send reply
});

//Delete data
router.delete('/DeleteShoe/:shoe', (req, res) => {
  const shoe = req.params.shoe;
  let found = false;
  console.log(shoe + " from indeex.js");    

  for(var i = 0; i < serverShoeArray.length; i++) // find the match
  {
    if(serverShoeArray[i].shoeName === shoe){
      serverShoeArray.splice(i,1);  // remove object from array

    //********************** */
    // need to write updated data to persisted disk file

    fileManager.write();

    //**************************************** */
    found = true;
    break;
}
}

 if (!found) {
   console.log("Could not delete " + shoe);
   return res.status(500).json({
     status: "error"
 });
 } else {
 res.send('Succesfully deleted ' + shoe +  ". Redirecting back to shoe show page");
 }
});

module.exports = router;
