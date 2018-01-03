// My Dependencies!
const express = require('express');
const path = require('path');
const Twilio = require('twilio');
const VoiceResponse = Twilio.twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;

//TWILIO ACCOUNT INFO ETC. 
const CONFIG = require("./secrets") 

//Create Twilio Client
const client = new Twilio(CONFIG.accountSid, CONFIG.authToken);

//Create the Application
const app = express();

//Host Index page for phase2/3
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser to parse the inpput
app.use(urlencoded({
  extended: false
}));

//Post Request to handle Incoming calls!
app.post('/voice', (req, res) => {
  const twiML = new VoiceResponse();
  console.log(req);
  // Function to help get the user input
  function gather() {
    const gather = twiML.gather();
    gather.say("Greetings! Please enter a number from 1 through n to play the Fizz Buzz game!")
    // If the user doesn't enter input, loop
    twiML.redirect('/voice');
  }


  //If there was an input, process it and play the game, if not, try gathering an input again until there is an input!
  if (req.body.Digits) {
    const x = req.body.Digits;
    for (let a = 1; a <= x; a++) {
      if (a % 15 == 0) {
        twiML.say("FizzBuzz");
      } else if (a % 3 == 0) {
        twiML.say("Fizz");
      } else if (a % 5 == 0) {
        twiML.say("Buzz");
      } else {
        twiML.say(a);
      }
    }
  } else {
    gather();
  }

  //Once the game is over, send a response back to end the call
  res.type('text/xml');
  res.send(twiML.toString());
});


// Post request for creating outbound calls
app.post('/outboundVoice', (req, res) => {

  // Gets the number of seconds and converts it to milliseconds or sets it to 0 based on the input. 
  let secondsDelay = req.body.delay ? 1000 * req.body.delay : 0;

  //Delays the call by the number of seconds provided and then calls the function which actually calls the input number. 
  setTimeout(call, secondsDelay);
  res.send(`Call Sent to : ${req.body.phoneNumber} with ${req.body.delay} seconds of delay`);

  //Call Function to call User
  function call() {
    client.api.calls
      .create({
        url: CONFIG.URL,
        to: req.body.phoneNumber,
        from: CONFIG.myNumber,
      })
      .then((call) => console.log(call.sid));
  }

})

// Listens for any Requests
app.listen(3000, () => console.log("App is Listening on http://localhost:3000"));