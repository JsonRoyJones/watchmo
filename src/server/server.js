const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dataController = require('./controllers/dataController');

const router = express.Router();
const { PORT } = require('../commands/utility/serverHelpers');

const app = express();
const chalk = require('chalk');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../display')));
app.use(express.static(path.join(__dirname, '../watchmoData')));

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/bundle.js'));
});

app.get('/api/configDash', dataController.getConfig, (req, res) => {
  console.log("infconifg get")
  res.status(200).json(res.locals.config);
});

app.post('/configDash', dataController.updateConfig, (req, res) => {
  console.log(res.locals.config);
  res.status(200).json();
});

app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, '../watchmoData/parsedData.json'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../display/index.html'));
});

app.get('/configDash', (req, res) => {
  res.sendFile(path.join(__dirname, '../display/index.html'));
});

app.get('/userDashBoard', (req, res) => {
  res.sendFile(path.join(__dirname, '../display/index.html'));
});

app.use('*', (req, res) => {
  res.sendStatus(404);
});

// global error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(400);
  res.render('error', { error: err });
}

app.listen(PORT);
console.log(chalk.cyan.bold(`app listening on ${PORT}`));

module.exports = {
  app
};
