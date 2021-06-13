// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;

// app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads



// Recieves the POST Request from the front-end
app.post('/calc', (req, res) => {
  var currFrom = req.body.currFrom;
  var curr1_value = req.body.curr1_value;
  var currTo = req.body.currTo;
  var curr2_value=10;
  var ratio = 0.0;


  console.log("--before switch: currFrom: " + currFrom + " currTo: " + currTo + " curr1_value: " + curr1_value);


  // a switch that basically first finds the given currency and then decides
  // the ratio on a nested switch based on the 2nd currency name
  switch (currFrom) {

    case "EUR":
      switch (currTo) {
        case "USD":
          ratio = 1.3764;
          break;
        case "SFR":
          ratio = 1.2079;
          break;
        case "GBP":
          ratio = 0.8731;
          break;
        }
      break;
    
      case "USD":
      switch (currTo) {
        case "JPY":
          ratio = 76.7200;
          break;
      }
      break;

      case "SFR":
      switch (currTo) {
        case "USD":
          ratio = 1.1379;
          break;
        }
        break;

        case "GBP":
        switch (currTo) {
        case "CAD":
          ratio = 1.5648;
          break;
        }
      break;
    default:
    // code block
  }
  console.log(ratio);
  
  // Calculating Currency Value
  curr2_value = curr1_value * ratio;
  
  console.log(currTo);
  console.log(curr2_value);
  console.log("[Given value: " + curr1_value + "\n Given curr: " + currFrom + " Ratio: " + ratio + "]");

  // The response that appears on the console. Just for validation reasons
  res.json('{ "CurrencyTo":' + curr2_value + '}');
});

// Testing that the server is listening
app.get('/', (req, res) => {
  res.send(`Hi! Server is listening on port ${port}`)
});

// listen on the port
app.listen(port);