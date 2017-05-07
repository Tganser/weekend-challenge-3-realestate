//requires
var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var path = require( 'path' );
var mongoose = require( 'mongoose' );

/// connect to mongo db
// mongoose.connect( 'localhost:/27017/realestate' );

/// define game schema
// var gameSchema = mongoose.Schema({
//   game: String,
//   year: Number,
//   platforms: String,
//   imageUrlIn: String
// }); //end schema
/// create global game model
// var game = mongoose.model( 'game', gameSchema );

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
