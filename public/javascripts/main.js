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
               document.location.href = "index.html#list";     
             } 
           
         });

         document.getElementById("buttonClear").addEventListener("click", function () {
      
            document.getElementById("shoeName").value = "";
            document.getElementById("year").value = 2022;
            document.getElementById("price").value = "";
            document.getElementById("URL").value = "";
        });

            //load list before click
            $(document).on("pagebeforeshow", "#list", function (event) {   // have to use jQuery 
               createList();
             
            });
            //load list before click
            $(document).on("pagebeforeshow", "#delete", function (event) {   // have to use jQuery 
               deleteList();
             
            });

            //sort by Price
            document.getElementById('buttonSortPrice').addEventListener("click", function () {
               clientShoeArray.sort(function(a,b){
                  return a.price - b.price;
               });
               createSortList();   
               alert( "New List Updated by Price!")
            });

            //sort by Title
            document.getElementById('buttonSortTitle').addEventListener("click", function(){
               clientShoeArray.sort(shoeNameSort);
               createSortList();
               alert(  "New List Updated by Alphabetical Order!")
              
            });
            
            //sort by Year
            document.getElementById('buttonSortYear').addEventListener("click", function(){
               clientShoeArray.sort(yearSort);
               createSortList();
               alert("New List Updated by Year!") 
            });

            

            //active Li page to delete shoe.

            $(document).on("pagebeforeshow", "#details", function (event) {   // have to use jQuery 
               let localID = localStorage.getItem('parm');  // get the unique key back from the dictionairy
               clientShoeArray = JSON.parse(localStorage.getItem('clientShoeArray'));  
               let arrayPointer = GetArrayPointer(localID);
               document.getElementById("inputText").innerHTML = "The shoe you clicked on was: " + clientShoeArray[arrayPointer].shoeName;
   
            });

            //delete shoe
            document.getElementById("deleteShoe").addEventListener("click", function () {
               let localID = localStorage.getItem('parm');  // get the unique key back from the dictionairy
               clientShoeArray = JSON.parse(localStorage.getItem('clientShoeArray'));  
               let arrayPointer = GetArrayPointer(localID);
               console.log("from button: " + arrayPointer + " " + clientShoeArray[arrayPointer].shoeName);
               let which = clientShoeArray[arrayPointer].shoeName;
               console.log(which);
               $.ajax({
                   type: "DELETE",
                   url: "/DeleteShoe/" +which,
                   success: function(result){
                       alert(result);
                   },
                   error: function (xhr, textStatus, errorThrown) {  
                       alert("error from main.js ")
                   }  
               });
               document.location.href = "index.html#list";
               createList();
               
       
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
                let arrayPointer = GetArrayPointer(parm);
                window.open(clientShoeArray[arrayPointer].url);
      });
   });
});
};

//Difference from createList is that we just want active li's to go to #details page, not open tab to URL
function deleteList() {
   // clear prior data
   //go get data
   $.get("/getAllShoes", function(data, status){  // AJAX get
         clientShoeArray = data;  // put the returned server json data into our local  array
         
         var deleteMovieList = document.getElementById("deleteMovieList");
         while (deleteMovieList.firstChild) {    // remove any old data so don't get duplicates
         deleteMovieList.removeChild(deleteMovieList.firstChild);
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

         
         deleteMovieList.appendChild(ul);

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
// If I leave AJAX get call code, the array will always be in the same order that is hard-coded in the server
//and not be the new array I want by sorting.
function createSortList() {
  
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
               let arrayPointer = GetArrayPointer(parm);
               window.open(clientShoeArray[arrayPointer].url);
                     
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


function yearSort(a,b) {
   return a.year - b.year;
}

function shoeNameSort(a,b) {
   if (a.shoeName.toLowerCase() < b.shoeName.toLowerCase()) return -1;
   if (a.shoeName.toLowerCase() > b.shoeName.toLowerCase()) return 1;
   return 0;
}





