const express = require('express');
const bodyParser = require('body-parser');

const path = require('path')
const PORT = process.env.PORT || 3000

var app = express();
app.use(bodyParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req, res) => res.send('Hello World!'));

// POST method route
app.post('/', function (req, res) {
  console.log(req.body);
  res.json({error: false});
});

app.listen(PORT, () => console.log('Example app listening on port ' + PORT));
