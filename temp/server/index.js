const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 11222;

// const redis = require('redis');
// const client = redis.createClient('redis://h:p29df780410985b425daec2b96e532e234b2ff97642febcb24368b821691a1764@ec2-35-171-227-50.compute-1.amazonaws.com:33059');
// client.on('error', (err) => {
//     console.log('Error ' + err);
// });




// Serve all the static build
app.use(express.static('web'));

// Expect all requests to be JSON
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/temp', (req, res) => {
  const data = req.body;
  res.send(data);
});

app.get('/temp', (req, res) => {
  res.send({msg: 'hello world'});
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/web/index.html');
});

// Start server listening.
app.listen(port);
