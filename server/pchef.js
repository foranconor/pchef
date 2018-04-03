const express = require('express');
const bodyParser = require('body-parser');
//const winston = require('winston');
const winston = require('winston');
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'test.loggg'
    })
  ]
});


const moment = require('moment');
function timestamp() {
  return moment().format('DD-MM-YYYY HH:mm:ss');
}

const MongoClient = require('mongodb').MongoClient;
const app = express();
logger.info('hello world');
logger.error(timestamp());


const port = 9898;
const dbString = 'mongodb://localhost';

const ingredient = {
  name: 'flour',  // must be unique in data
  price: 20.1, // javascript number no fuss
  quantity: 20,
  unit: 'kg',  // just string
  from: [
    'Moore Wilsons',
    'New World'
  ]
}

const recipe = {
  name: 'bread',
  method: 'make bread',
  makes: 1, // allow recipe to be used as ingredient
  ingredients: [
    {
      name: 'flour',
      quantity: 1000,
      unit: 'g'
    },
    {
      name: 'yeast',
      quantity: 20,
      unit: 'g'
    }
  ]
}

const INGREDIENTS = 'ingredients';
const RECIPES = 'recipes';
const MENUS = 'menus';

var database;

MongoClient.connect(
    dbString,
    {
        poolSize: 10
    },
    (error, client) => {
        if (error !== null) throw 'Database connection failed ' + error;
        else database = client.db('pchef');
});

app.use(bodyParser.json());

//app.use(express.static('./web'));

/* CRUD Matrix
 *
 * Resources     | C | R | U | D |
 * -------------------------------
 * Ingredient    | x |   |   |   |
 * Recipe        | x |   |   |   |
 * Menu          |   |   |   |   |
 *
 *
 */

app.get('ingredients', (req, res) => {

});

app.post('ingredients/add', (req, res) => {
  const is = req.body.data;
  database.collection(INGREDIENTS).insertMany(is, err => {
    if (err) res.sendStatus(500);
    else res.send(is);
  });
});

app.post('recipes/add', (req, res) => {
  const rs = req.body.data;
  database.collection(RECIPES).insertMany(rs, err => {
    if (err) res.sendStatus(500);
    else res.send(rs);
  })
});

app.get('*', (req, res) => {
  console.log('hello');
  logger.error(timestamp());
  res.sendFile(__dirname + '/web/index.html');
});

app.listen(port);
