$(document).ready( function(){
  console.log("JQ sourced");

  getAllProperties();
  $("#submitbutton").on("click", addProperty);
});

function getAllProperties(){
  console.log("in function get all properties on client");

  $.ajax({
    type: 'GET',
    url: '/properties',
    success: function(response) {
      // console.log('back from get properties with: ', response);

      for (var i = 0; i < response.length; i++) {
        if (response[i].cost === undefined){
          var infoR = '<div class="col-sm-2 prop col-centered">';
          infoR+= "<h3>For Rent</h3>";
          infoR += "<p> Property ID: <p>" + response[i]._id +"</p></p>";
          infoR += "<p>Rental Cost: $" + response[i].rent +"</p>";
          infoR += "<p>" + response[i].sqft +" square feet </p>";
          infoR += "<p>City: " + response[i].city +"</p></div>";
          $("#for-rent").append(infoR);
        }

        if (response[i].rent === undefined){
          var infoS = '<div class="col-sm-2 prop col-centered">';
          infoS+= "<h3>For Sale</h3>";
          infoS += "<p> Property ID: <p>" + response[i]._id +"</p></p>";
          infoS += "<p>Cost: $" + response[i].cost +"</p>";
          infoS += "<p>" + response[i].sqft +" square feet </p>";
          infoS += "<p>City: " + response[i].city +"</p></div>";
          $("#for-sale").append(infoS);
        }
      }
    }//end success
  });//end of ajax
}//end getAllProperties

function addProperty(){
  console.log("submit clicked! In add property");

  var rentCost = "undefined";
  var saleCost = "undefined";
  // var typeProp = $("typeProp").val();
  // console.log(typeProp);

  if ($("#sale").checked === true){
    console.log("FOR SALE PROPERTY!");
    saleCost = $("#cost").val();
      console.log("Cost: ",saleCost);
  }

  if ($("#rent").checked === true){
    console.log("FOR RENT PROPERTY!");
    rentCost = $("#rent").val();
      console.log("Cost: ",rentCost);
  }

  // if (typeProp === "rent"){
  //   rentCost = $("#cost").val();
  //   console.log(rentCost);
  // }
  // if (typeProp === "sale"){
  //   saleCost = $("#cost").val();
  //   console.log(rentCost);
  // }
  // else {
  //   console.log("error in sale/rental statement");
  // }


  var propToSend = {
  	"cost" : saleCost,
    "rent": rentCost,
  	"sqft" : $("#sqft").val(),
  	"city" : $("#city").val(),
  	"__v" : "0"
  };

  // <input type="checkbox" name="sale" id="sale"> For Sale<br><input type="checkbox" name="rent" id="rent"> For Rent<br>
  // Cost: <input type="number" name="cost" id="cost">
  // Square Feet: <input type="number" name="sqft" id="sqft">
  // City: <input type="text" name="city" id="city">
  console.log(propToSend);

  $.ajax({
    type: 'POST',
    url: '/properties',
    data: propToSend,
    success: function(response) {
      console.log('back from add property with: ', response);
      getAllProperties();
    }//end success
  });//end post
}//end addProperty
