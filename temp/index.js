const moment = require('moment');
const fs = require('fs');
const start = moment().toISOString();
const stream = fs.createWriteStream('test-2probe-' + start + '.dat');
const SPI = require('pi-spi');
const spi = SPI.initialize('/dev/spidev0.0');

spi.clockSpeed(1e6);

let offset = 30 - 3.9 + 3 - 0.1;

let a0 = Buffer.from('c00000', 'hex');
let a1 = Buffer.from('c80000', 'hex');


stream.once('open', fd => {
  setInterval(() => {
    const now = moment().valueOf();
    let s0;
    let s1;
    let mv;
    let val;
    spi.transfer(a0, a0.length, (err0, res0) => {
      if (err0) console.error(err0);
      else {
        val = parseInt(res0.toString('hex'), 16) >> 4;
        mv = val / 4096 * 3300;
        s0 = transfer(mv);
        spi.transfer(a1, a1.length, (err1, res1) => {
          if (err1) console.error(err1);
          else {
            val = parseInt(res1.toString('hex'), 16) >> 4;
            mv = val / 4096 * 3300;
            s1 = transfer(mv);
            stream.write(now + ' ' + s0.toFixed(2) + ' ' + s1.toFixed(2) + '\n');
          }
        });
      }

    });
  }, 100);
});

// temp sensor constants
const m = 10.888;
const c = 0.00347;
const b = 1777.3;

// function to map a millivolt value to a temperature in degrees c
function transfer(mv) {
  return (m - Math.sqrt((-m)*(-m) + 4 * c * (b - mv))) / (2 * (-c)) + offset;
}
