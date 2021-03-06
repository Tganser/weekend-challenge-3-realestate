$(document).ready( function(){
  console.log("JQ sourced");

  //load all properties on DOM
  getAllProperties();

  //event listener
  $("#submitbutton").on("click", addProperty);
});



function getAllProperties(){
  console.log("in function get all properties on client");


  $.ajax({
    type: 'GET',
    url: '/properties',
    success: function(response) {
      // console.log('back from get properties with: ', response);

      //creates the for sale property row
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
        // creates the for rent property row
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


//this addProperty function isn't quite working. It looks like it creates the object, but it doesn't
//send it to the database - this must be because of the schemas? Not sure.
function addProperty(){
  console.log("submit clicked! In add property");

//trying to get data off the radio buttons
  var rentCost = "undefined";
  var saleCost = "undefined";

  rentCost = $('input:radio[name=rent]:checked').val();
  // console.log(rentCost);
  if (rentCost === "rent"){
    rentCost = $("#cost").val();
    console.log(rentCost);
  }
  saleCost = $('input:radio[name=sale]:checked').val();
  // console.log(saleCost);
  if (saleCost === "sale"){
    saleCost = $("#cost").val();
    console.log(saleCost);

  }

  var propToSend = {
  	"cost" : saleCost,
    "rent": rentCost,
  	"sqft" : $("#sqft").val(),
  	"city" : $("#city").val(),
  	"__v" : "0"
  };

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
