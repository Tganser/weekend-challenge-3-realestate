$(document).ready( function(){
  console.log("JQ sourced");

  getAllProperties();
});

function getAllProperties(){
  console.log("in function get all properties on client");

  $.ajax({
    type: 'GET',
    url: '/properties',
    success: function(response) {
      console.log('back from get properties with: ', response);
      var allProp = $('#allProp');
      allProp.empty();

      for (var i = 0; i < response.length; i++) {
        var info = '<div class="col-sm-3 prop">';
        info += "<p> Property ID: " + response[i]._id +"</p>";
        info += "<p>For Sale Cost: " + response[i].cost +"</p>";
        info += "<p>For Rent Cost: " + response[i].rent +"</p>";
        info += "<p>Square Feet: " + response[i].sqft +"</p>";
        info += "<p>City: " + response[i].city +"</p></div>";
        // info += '<button class ="del btn-secondary" data-id="'+response[i]._id +'">Delete </button></div>';
        // <button class="removeButton btn btn-secondary" data-id="' + albums[i]._id + '">Remove</button></div>


        // "_id" : String,
        // "cost" : Number,
        // "rent": Number,
        // "sqft" : Number,
        // "city" : String,
        // "__v" : Number
        allProp.append(info);
      }//end for var
    }//end success
  });//end of ajax


}
