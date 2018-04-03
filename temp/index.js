const SPI = require('pi-spi');

const spi = SPI.initialize('/dev/spidev0.0');
// adc must operate between
spi.clockSpeed(1e6);

// temp sensor constants
const m = 10.888;
const c = 0.00347;
const b = 1777.3;

const offset = 34;

let buf = Buffer.from('c00000', 'hex');

let t = 0;

// take n samples at an interval of i milliseconds
// report the average
function sample(n, i) {
  const a = [];
  const s = setInterval(() => {
    spi.transfer(buf, buf.length, (err, res) => {
      if (err) console.error(err);
      else {
        const val = parseInt(res.toString('hex'), 16) >> 4;
        const mv = val / 4096 * 5000;
        a.push(mv);
      }
    });
  }, i);

  setTimeout(() => {
    clearInterval(s);
    const mv = a.reduce((p, q) => p + q, 0) / a.length;
    console.log(mv + ' mv');
    t = transfer(mv);
    console.log(t + '\u00B0c');
  }, i * n);
}

const u = setInterval(sample, 1000, 50, 30);

function transfer(mv) {
  return (m - Math.sqrt((-m)*(-m) + 4 * c * (b - mv))) / (2 * (-c)) + offset;
}

function zero() {
  sample(100, 100);
  offset = offset - t;
}

setTimeout(zero, 45000);
