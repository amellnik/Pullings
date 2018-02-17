const express = require('express');
const bodyParser = require('body-parser');
var mysql      = require('mysql');

const path = require('path')
const PORT = process.env.PORT || 3000

var pool = mysql.createPool({
  host     : process.env.MYSQL_SERVER,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASS,
  database : 'aubrey_api'
});

var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get('origin'));
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// POST method route
app.get('/', function (req, res) {
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.json({error: true, message: err})
    }
    // Use the connection
    connection.query('SELECT * FROM demo', function (error, results, fields) {
      // And done with the connection.
      connection.release();

      if (error) {
        res.json({error: true, message: error});
      };
      // Things worked
      res.json({error: false, data: results});
    });
  });

});

// POST method route
app.post('/', function (req, res) {
  console.log(req.body);
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.json({error: true, message: err})
    }
    // Use the connection
    connection.query('INSERT INTO demo VALUES (NULL, ?, ?, ?)', [req.body.lat, req.body.long, req.body.text], function (error, results, fields) {
      // And done with the connection.
      connection.release();

      if (error) {
        res.json({error: true, message: error});
      };
      // Things worked
      res.json({error: false});
    });
  });

});

app.listen(PORT, () => console.log('Example app listening on port ' + PORT));
