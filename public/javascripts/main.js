//client 

let clientShoeArray = [];



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
   
   
   document.getElementById("addButton").addEventListener("click", function () {
   
          if ((document.getElementById("shoeName").value.trim() == '' || document.getElementById("year").value.trim() == '' || document.getElementById("price").value.trim() == '' ||  document.getElementById("URL").value.trim() == '')) 
          {
             alert("Please fill out all fields");

          } else {
               let newShoe = new shoeObject(document.getElementById("shoeName").value,document.getElementById("year").value,document.getElementById("price").value, document.getElementById("URL").value);
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
            
             document.location.href = "index.html#list";     
             console.log(clientShoeArray);
         });
            

            $(document).on("pagebeforeshow", "#list", function (event) {   // have to use jQuery 
               createList();
               console.log(clientShoeArray);
            });

            document.getElementById('buttonSortPrice').addEventListener("click", function () {
               console.log(clientShoeArray.sort(sortFunction));
               createSortList();
              
             
               
            });

            $(document).on("pagebeforeshow", "#details", function (event) {   // have to use jQuery 
               let localID = localStorage.getItem('parm');  // get the unique key back from the dictionairy
               clientShoeArray = JSON.parse(localStorage.getItem('clientShoeArray'));  
               let arrayPointer = GetArrayPointer(localID);
               document.getElementById("oneShoeName").innerHTML = "The shoe name is: " + clientShoeArray[arrayPointer].shoeName;
               document.getElementById("oneYear").innerHTML = "Year released: " + clientShoeArray[arrayPointer].year;
               document.getElementById("onePrice").innerHTML = "Price: " + clientShoeArray[arrayPointer].price;
            
              

            });


});


function createList() {
   // clear prior data
   //go get data
   $.get("/getAllShoes", function(data, status){  // AJAX get
     
         clientShoeArray = data;  // put the returned server json data into our local  array
         
         var divMovieList = document.getElementById("divMovieList");
         while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
             divMovieList.removeChild(divMovieList.firstChild);
         };
      
         var ul = document.createElement('ul');
        
         //creating li's, giving them ID's via setAttribute
         clientShoeArray.forEach(function (element) {   
            var li = document.createElement('li');
            li.classList.add('oneMovie'); 
            li.setAttribute("data-parm", element.ID);
            li.innerHTML = "Name: " + element.shoeName + " | Year:  " + element.year + " | Price: " + element.price;
            ul.appendChild(li);
         });


         divMovieList.appendChild(ul);

         //this is creating active li's.
        
         var liArray = document.getElementsByClassName("oneMovie");
         Array.from(liArray).forEach(function (element) {
            element.addEventListener('click', function () {
               // get that data-parm we added for THIS particular li as we loop thru them
               var parm = this.getAttribute("data-parm");  // passing in the record.Id
               // get our encoded value and save THIS ID value in the localStorage "dictionairy"
               localStorage.setItem('parm', parm);
               let stringShoeArray = JSON.stringify(clientShoeArray); // convert array to "string"
               localStorage.setItem('clientShoeArray', stringShoeArray);
               document.location.href = "index.html#details";

        
      });
   });
});
};

function createSortList() {
   // clear prior data
   //go get data
   // $.get("/getAllShoes", function(data, status){  // AJAX get
     
   //       clientShoeArray = data;  // put the returned server json data into our local  array
         
         var divMovieList = document.getElementById("divMovieList");
         while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
             divMovieList.removeChild(divMovieList.firstChild);
         };
      
         var ul = document.createElement('ul');
        
         //creating li's, giving them ID's via setAttribute
         clientShoeArray.forEach(function (element) {   
            var li = document.createElement('li');
            li.classList.add('oneMovie'); 
            li.setAttribute("data-parm", element.ID);
            li.innerHTML = "Name: " + element.shoeName + " | Year:  " + element.year + " | Price: " + element.price;
            ul.appendChild(li);
         });


         divMovieList.appendChild(ul);

         //this is creating active li's.
        
         var liArray = document.getElementsByClassName("oneMovie");
         Array.from(liArray).forEach(function (element) {
            element.addEventListener('click', function () {
               // get that data-parm we added for THIS particular li as we loop thru them
               var parm = this.getAttribute("data-parm");  // passing in the record.Id
               // get our encoded value and save THIS ID value in the localStorage "dictionairy"
               localStorage.setItem('parm', parm);
               let stringShoeArray = JSON.stringify(clientShoeArray); // convert array to "string"
               localStorage.setItem('clientShoeArray', stringShoeArray);
               document.location.href = "index.html#details";

        
      });
   });

};

function GetArrayPointer(localID) {
   for (let i = 0; i < clientShoeArray.length; i++) {
       if (localID === clientShoeArray[i].ID) {
           return i;
       }
   }
}

function sortFunction(a,b) {
   return a.price - b.price;
}

// function dynamicSort(property) {
//    var sortOrder = 1;

//    if (property[0] === "-") {
//        sortOrder = -1;
//        property = property.substr(1);
//    }

//    return function (a, b) {
//        if (sortOrder == -1) {
//            return b[property].localeCompare(a[property]);
//        } else {
//            return a[property].localeCompare(b[property]);
//        }
//    }
// }



