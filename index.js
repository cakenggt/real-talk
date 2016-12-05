'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);

//parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Deliver the public folder statically
app.use(express.static('public'));

//This tells the server to listen
var port = process.env.PORT;
http.listen(port, function(){
  console.log('Example app listening on port '+port+'!');
});

//This is the options object that will be passed to the api files
let apiOptions = {
  app: app
};

//Load the api versions
require('./api/v1')(apiOptions);

/*
* This tells the server to always serve index.html no matter what,
* excluding the previously defined api routes. This is so we can use
* react-router's browserHistory feature.
*/
app.get('*', function(req, res){
  res.sendFile(__dirname+'/public/html/index.html');
});

var socketOptions = {
  app: http
};
//Load the socket file
require('./sockets')(socketOptions);
