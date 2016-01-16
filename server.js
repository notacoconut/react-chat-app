'use strict';
var fs            = require('fs'),
    path          = require('path'),
    express       = require('express'),
    bodyParser    = require('body-parser');
var app = express();

var MESSAGE_FILE = path.join(__dirname, 'chat.json');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(process.env.PORT || 3000, function(){
  console.log('The server has been started on port 3000!');
});