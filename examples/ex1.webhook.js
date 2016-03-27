'use strict';

const TeaBot = require('../main')('YOUR_TELEGRAM_BOT_TOKEN', 'YOUR_TELEGRAM_BOT_NAME');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

TeaBot.onError(function (e) {
  console.error('Error:', e, e.stack);
});

TeaBot
  .defineCommand('/help', function (dialog) {
    dialog.sendMessage('This is /help command');
  })
  .defineCommand(function (dialog) {
    dialog.sendMessage('Send me /help for more information.');
  });

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

TeaBot.setWebhook('YOUR_URL_HERE');

app.post('/', function (req, res) {
  var message = req.body || false;
  if (message) {
    TeaBot.receive(message);
  }

  res.status(200).end();
});

app.listen(3000);
