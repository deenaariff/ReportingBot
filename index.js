
// Radar App Rounds Checkin SMS App
// Date: May 26, 2016
// Author: Deen Aariff

// Ensure App and Express Dependencies
express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser');

// Initialize other dependencies
var io = require('socket.io')(http);

// Setup Express and Body Parser
var app = express();
// Use Express
app.use(express.static('./Dashboard/'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Twilio Initialization
var client = require('./NodeModules/twilioInit');
var TWI_NUMBER = "+14086640384" // Insert Twilio Phone Number

// Indexing Data (Will Be Abstracted Away into Database)
// Data to be used (Will Be Abstracted Away into Database)
// Users intiialized (Will Be Abstracted Away into Database)
var index = 0;
var protocol = require('./Data/data.json');
var users = [];

// Handles Users Who Wish to See Logged date
app.get('/', function(req, res) {
            res.sendFile(__dirname + '/index.html');
});

// Will Handle All Responses to Twilio Server
app.get('/twilio', function(req, res) {

            // Testing: Output All Message to Console.
            console.log('RECEIVED REQUEST');
            console.log("MESSAGE: " + req.query.Body);
            console.log("FROM: " + req.query.From);

            num = req.query.From

            // Initialize User Info
            if (req.query.Body === "Initialize User") {

                console.log("Case: Initialize User");
                users[num] = {}; // Intialize User Hashed by Phone Number
                users[num].index = -1; // Stores Current Protocol Object
                users[num].history = []; // History of Session Objects
                users[num].session = {}; // Create Session to Store Current Interactions

                console.log("New User Intialized (" + num + ")");

                // Request Name from User
                client.sendSMS(req.query.From,
                    TWI_NUMBER,
                    "Enter Name");

                // Else if User is not Intialized
            } else if (!users[num]) {

                console.log("Case: User Does Not Exist");
                client.sendSMS(req.query.From,
                    TWI_NUMBER,
                    "This Phone Number not allowed access to the Server");

            } else if (users[num].index === -1) {

                users[num].u_name = req.query.From; // Store User Name

                client.sendSMS(req.query.From,
                    TWI_NUMBER,
                    "User [" + num +
                    "] Has Been Initialized. Password: test");

                users[num].index = 0; // Set Index to 0, User Can Interact with Protocol

            } else {

                console.log("Case: Enter Protocol");

                index = users[num].index;

                // Checks Trigger Response to Handle
                if (req.query.Body === protocol.data[index].trigger) {

                    var currentCommand = protocol.data[index]; // Easier Syntax in Logic

                    // If last response in protocol sequence
                    if (currentCommand.flag === "terminate") {

                        users[num].history.push(users[num].session); // Push Session into History
                        users[num].session = {}; // Clear User's Current Session

                        io.sockets.emit('data:update', users) // Broadcast User list to All Dashboard Clients

                    // Else If Logged Flag is True
                    } else if (currentCommand.log === 1) {

                        console.log("Command Requires Log");
                        var id_flag = currentCommand.flag;
                        users[num].session[id_flag] = req.query.Body;

                    }

                    // Iterate in case of multiple repsonses
                    // Iterate through all responses corresponding to trigger
                    for (i in currentCommand.response) {

                        client.sendSMS(req.query.From,
                            TWI_NUMBER,
                            currentCommand.response[i]);
                    }

                    // Ensure Protocol Flow Continues
                    if (users[num].index === (protocol.data.length()-1)) {
                          users[num].index = 0
                    }
                    else {
                          users[num].index = users[num].index + 1;
                    }

                } else {
                    // Only if Past first step in protocol then Notify Error to User
                    if (index > 0) {

                        client.sendSMS(req.query.From, TWI_NUMBER, "Response Failed:" +
                            protocol.data[index - 1].response[0]);
                    }
                }

            }

            // Carraige Return
            // Formating for Testing
            console.log("");
})


.listen(process.env.PORT || 5000)
