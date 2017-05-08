//requires
var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var path = require( 'path' );
var mongoose = require( 'mongoose' );

/// connect to mongo db
mongoose.connect( 'localhost:27017/realestate' );


/// define schema
var listingSchema = mongoose.Schema({
  "_id" : String,
	"cost" : Number,
  "rent": Number,
	"sqft" : Number,
	"city" : String,
	"__v" : Number
}); //end schema

// / create global listing model
var listing = mongoose.model( 'listings', listingSchema );

// uses
app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// globals
var port = process.env.PORT || 9998;

//set up server
app.listen( port, function(){
  console.log( 'server up on:', port );
}); // end server up

// routes
app.get( '/', function ( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); //end get url

//app.get
app.get('/properties', function(req, res){
  console.log('get all properties');
  listing.find().then(function(data){
    // console.log(data);
    res.send(data);
  });//end get properties
});//end app.get

app.post('/properties', function(req, res){
  console.log('in post property');
  console.log(req.body);
  var newListing = listing(req.body);
  newListing.save();
  res.send(200);
});//end of app post
