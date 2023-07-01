const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/webhook', (req, res) => {
  
  const intent = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters;

  const response = {
    fulfillmentText: 'This is the response from the webhook',
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Webhook server is running on port ${PORT}`);
});
