'use strict';
var fs            = require('fs'),
    path          = require('path'),
    express       = require('express'),
    bodyParser    = require('body-parser');
var app = express();

var MESSAGE_FILE = path.join(__dirname, 'messages.json');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/messages', function(req, res){
  fs.readFile(MESSAGE_FILE, function(err, data){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/messages', function(req, res){
  fs.readFile(MESSAGE_FILE, function(err, data){
    if(err){
      console.error(err);
      process.exit(1);
    }
    var messages = JSON.parse(data);
    var newMessage = {
      id: Date.now(),
      user: req.body.user,
      text: req.body.text
    };
    messages.push(newMessage);
    fs.writeFile(MESSAGE_FILE, JSON.stringify(messages, null, 4), function(err){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(messages);
    });
  });
});


app.listen(process.env.PORT || 3000, function(){
  console.log('The server has been started on port 3000!');
});