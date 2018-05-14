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

let set0 = 37.5;
let set1 = 37.5;
let i1 = 0;

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
        val = parseInt(res0.toString('hex'), 16) >> 5;
        val = val << 1;
        mv = val / 4096.0 * 3300.0;
        s0 = transfer(mv);
        spi.transfer(a1, a1.length, (err1, res1) => {
          if (err1) console.error(err1);
          else {
            val = parseInt(res1.toString('hex'), 16) >> 5;
            val = val << 1;
            mv = val / 4096.0 * 3300.0;
            s1 = transfer(mv);
            // have plant input, s0 and s1
            // control s1
            let error1 = set1 - s1;
            let i1 = i1 + error;
            stream.write(now + ' ' + s1 + ' ' + error1 + ' ' + i1 + ' ' + (error1 + i1) + '\n');
          }
        });
      }

    });
  }, 1000);
});

// temp sensor constants
const m = 10.888;
const c = 0.00347;
const b = 1777.3;

// function to map a millivolt value to a temperature in degrees c
function transfer(mv) {
  return (m - Math.sqrt((-m)*(-m) + 4 * c * (b - mv))) / (2 * (-c)) + offset;
}
