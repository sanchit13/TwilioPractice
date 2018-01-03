1. Master is Phase 1 :  Simple TwiML PhoneBuzz, PhaseTwo Branch is Phase 2: Dialing PhoneBuzz & Phase 3: Delayed PhoneBuzz combined into one branch. 

2. In order to work with the master branch [Phase 1], here are the following steps to get everything up and running.
    1. npm install
    2. Create a Twilio Account and generate a phone number. 
    3. run "node server.js" in your terminal and also "ngrok http 3000" in another window of terminal. 
    4. Copy the URL generated by "ngrok http 3000" and add /voices/ in the end so that it hits the proper API Endpoint. It should look something like this " http://9e692240.ngrok.io/voices"
    5. Go to the Twilio console associated with your account and go the generated phone number and under the "Voice & Fax" group, Paste the URL from step 4 into the "A call comes in" Input with the method set to "HTTP POST"
    6. Now the application is linked to your Twilio Phone number, so whoever calls your Twilio phone number will be playing the Fizz Byzz game! 
    7. Everytime you create a new ngrok link, you have to do all these steps over again. 

3. In order to work with the PhaseTwo branch [Phase 2/3], here are the following steps to get everything up and running.
    1. npm install
    2. Create a Twilio Account and generate a phone number. 
    3. Run ngrok http 3000" in  terminal. 
    4. Create a file called "secrets.js" with the following structure. 
        module.exports = {
            accountSid : Account SID from your Twilio Account,
            authToken : API Auth token from your Twilio Account,
            URL : The URL generated with ngrok http 3000, Example : "http://9e692240.ngrok.io/voice",
            myNumber : Your Twilio Phone Number
        };
    5. Run "node server.js" to get the application up and running
    6. Go to http://localhost:3000
    7. Enjoy! 