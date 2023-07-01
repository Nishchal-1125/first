const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express().use(bodyParser.json());

app.get('/endpoint', (req, res) => {
  // Handle the GET request logic here
  res.send('This is the response for the GET request');
});

app.use(express.static(__dirname + '/public'));
require('dotenv').config();

app.post('/webhook', (request, response) => {
  const agent = new WebhookClient({ request, response });

  function welcome(agent) {
    const userQuery = agent.query; // Get the user query
    const sessionId = agent.sessionId; // Get the session ID
    console.log('User Query:', userQuery);
    console.log('Session ID:', sessionId);
    agent.add('Welcome to my agent'); // Add your fulfillment logic here
  }

  let intents = new Map();
  intents.set('', welcome);
  agent.handleRequest(intents);
});

const https = require('https');
const fs = require('fs');

const privateKey = fs.readFileSync(process.env.SSL_KEY, 'utf8');
const certificate = fs.readFileSync(process.env.SSL_CERT, 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);
const httpsPort = process.env.HTTPSPORT || 8443;

httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS Server is running on Port: ${httpsPort}`);
});
