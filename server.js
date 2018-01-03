// My Dependencies!
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;

//Create the Application
const app = express();

//Body Parser to parse the inpput
app.use(urlencoded({
  extended: false
}));

//Post Request to handle Incoming calls!
app.post('/voice', (req, res) => {
  const twiML = new VoiceResponse();

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

app.listen(3000, () => console.log("App is Listening on http://localhost:3000"));