//client 

let clientShoeArray = [];

let shoeNameValue = null;
let shoeYearValue = null;
let shoePriceValue = null;
let shoeURLValue = null;


let shoeObject = function (aShoeName, aYear, aPrice, aURL ) {
   this.ID = Math.random().toString(16).slice(5)
   this.shoeName = aShoeName,
   this.year = aYear,
   this.price = aPrice;
   this.url = aURL;
}

// shoeArray.push(new shoeObject("True Blue 3's", 2019, 220, "url"));
// shoeArray.push(new shoeObject("Bred 11s", 2013, 180, "url"));
// shoeArray.push(new shoeObject("Fire Red 4's", 2012, 300, "url"));




document.addEventListener("DOMContentLoaded", function () {
   
 shoeNameValue = document.getElementById("shoeName").value;
 shoeYearValue = document.getElementById("year").value;
 shoePriceValue = document.getElementById("price").value;
 shoeURLValue = document.getElementById("URL").value;
   
   document.getElementById("addButton").addEventListener("click", function () {
   
         if ((shoeNameValue.trim() == '' || shoeYearValue.trim() == '' || shoePriceValue.trim() == '')) {
            alert("Please fill out all fields");
         
         } else {
            let newShoe = new shoeObject(shoeNameValue, shoeYearValue, shoePriceValue, shoeURLValue);
            $.ajax({
               url : "/AddShoe",
               type: "POST",
               data: JSON.stringify(newShoe),
               contentType: "application/json; charset=utf-8",
               dataType   : "json",
               success: function (result) {
               console.log(result);
               }
            });
         }
    
});

  $(document).on("pagebeforeshow", "#list", function (event) {   // have to use jQuery 
   createList();
});


  



});
;

function createList() {
   // clear prior data
   //go get data
   $.get("/getAllShoes", function(data, status){  // AJAX get
     
         clientShoeArray = data;  // put the returned server json data into our local  array
      
         var theList = document.getElementById("myul");
         theList.innerHTML = "";

         clientShoeArray.forEach(function (element) {   // use handy array forEach method
            var li = document.createElement('li');
            li.innerHTML = "Name: " + element.shoeName + " | Year:  " + element.year + " | Price: " + element.price;
            theList.appendChild(li);
         });
   })

 
}