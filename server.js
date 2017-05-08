//requires
var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var path = require( 'path' );
var mongoose = require( 'mongoose' );

/// connect to mongo db
mongoose.connect( 'localhost:27017/realestate' );


/// define game schema
var listingSchema = mongoose.Schema({
  "_id" : String,
	"cost" : Number,
  "rent": Number,
	"sqft" : Number,
	"city" : String,
	"__v" : Number
}); //end schema

// / create global game model
var listing = mongoose.model( 'listings', listingSchema );

// console.log(listing.find());
// uses
app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// globals
// port set up to work with heroku OR localhost
var port = process.env.PORT || 9998;

//spin up server
app.listen( port, function(){
  console.log( 'server up on:', port );
}); // end server up

// routes
app.get( '/', function ( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); //end home base

//app.get
app.get('/properties', function(req, res){
  console.log('get all properties');
  listing.find().then(function(data){
    // console.log(data);
    res.send(data);
  });//end album find
});//end app.get

app.post('/properties', function(req, res){
  console.log('in post property');
  var newListing = listing(req.body);
  newListing.save();
  res.send(200);
});//end of app post
