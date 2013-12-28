var express = require('express');
var app = express();
var db= require('./db_interface.js')
var pg = require('pg');

app.use(express.bodyParser());




function simulateDelay(){
var delay=5;
var now = new Date();
var desiredTime= new Date().setSeconds(now.getSeconds() + delay);
console.log('waiting....' , now,desiredTime)

while( now < desiredTime){
now = new Date();
}

}
app.get('/projects', function(request, response) {
  console.log('serving..........')
  db['db']('projects').select('name').then(function(a){ 
    response.send(a);
  })

});

app.post('/quote', function(req, res) {
  var post_body=req.body;
  console.log(post_body.hasOwnProperty('project'))
  if(post_body.hasOwnProperty('project') && post_body.hasOwnProperty('by_name') && post_body.hasOwnProperty('quote'))
    {
      var project=post_body['project'];
      var by_name=post_body['by_name'];
      var quote=post_body['quote'];
      db['db']('quotes').returning('id').insert({project: project , quote: quote , by_name: by_name}).then(
        function(a){
        a.commit
        res.status(200);
        res.send();
      }
      );
    }
    else{
      res.status(500);
      res.send('ERROR');
    }
});




app.listen(8765);

