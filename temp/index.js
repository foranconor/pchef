const fetch = require('node-fetch');

const moment = require('moment');

const fs = require('fs');

const start = moment().toISOString();

const stream = fs.createWriteStream('test-' + start + '.dat');


const SPI = require('pi-spi');

const spi = SPI.initialize('/dev/spidev0.0');

const url = 'https://temperature-logger.herokuapp.com';

// adc must operate between
spi.clockSpeed(1e6);

// temp sensor constants
const m = 10.888;
const c = 0.00347;
const b = 1777.3;

const DEVICE_ID = 'living room';

let offset = 30 - 3.9 + 3;

let buf = Buffer.from('c00000', 'hex');

let t = 0;

stream.once('open', fd => {

// take n samples at an interval of i milliseconds
// report the average
function sample(n, i) {
  const now = moment().valueOf();
  const a = [];
  const s = setInterval(() => {
    spi.transfer(buf, buf.length, (err, res) => {
      if (err) console.error(err);
      else {
        const val = parseInt(res.toString('hex'), 16) >> 4;
	//console.log(val);
        const mv = val / 4096 * 3300;
        a.push(mv);
      }
    });
  }, i);

  setTimeout(() => {
    clearInterval(s);
    //a.sort();
    //const mv = parseFloat(a[a.length/2]);
    //console.log(a);
    const mv = a.reduce((p, q) => p + q, 0) / a.length;
    //console.log(mv.toFixed(2) + ' mv');
    t = transfer(mv);
    //console.log(t.toFixed(2) + ' \u00B0c');
    let f = t * (9 / 5) + 32;
    //console.log(f.toFixed(2) + ' \u00B0f');
    stream.write(now + ' ' + mv.toFixed(0) + ' ' + t.toFixed(2) + ' ' + f.toFixed(2) + '\n');
    
    //fetch(url + '/temp', {
    //  method: 'POST',
    //  body: JSON.stringify({
    //    location: DEVICE_ID,
    //    mv: mv,
    //    time: now,
    //    temp: t
    //  }),
    //  headers: {
    //    'Content-Type': 'application/json'
    //  }
    //}).then((v1) => console.log('logging')).catch(err => console.error(err));
    
  }, i * n);
}

const u = setInterval(sample, 10000, 96, 16);
});

function transfer(mv) {
  return (m - Math.sqrt((-m)*(-m) + 4 * c * (b - mv))) / (2 * (-c)) + offset;
}

function zero() {
  offset = offset - t;
}

//setTimeout(zero, 45000);
