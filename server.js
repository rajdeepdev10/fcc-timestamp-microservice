// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  console.log('Hello, World!');
  res.json({greeting: 'hello API'});
});



// API for empty route
app.get("/api/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

// API for a user_input
app.get('/api/:date?', function(req, res) {
  const user_input = req.params.date;
  let unix = null;
  let utc = null;

  // see if user input_input is date
  unix = new Date(user_input).getTime();
  utc = new Date(user_input).toUTCString();

  // if some error see if input is unix
  if (!unix || !utc) {
    unix = parseInt(user_input);
    utc = new Date (unix).toUTCString();
  } else {
    // otherwise return json timestamp
    res.json({"unix": parseInt(unix), "utc": utc});
  }

  // if still error return invalid date
  if (!unix || !utc) {
    res.json({error : "Invalid Date" })
  } else {
    // otherwise return json timestamp
    res.json({"unix": parseInt(unix), "utc": utc})
  }
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
