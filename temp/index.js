const SPI = require('pi-spi');

const spi = SPI.initialize('/dev/spidev0.0');
// adc must operate between
spi.clockSpeed(1e6);

// temp sensor constants
const m = 10.888;
const c = 0.00347;
const b = 1777.3;

const offset = 33;

let buf = Buffer.from('c00000', 'hex');

// take
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
    const t = (m - Math.sqrt((-m)*(-m) + 4 * c * (b - mv))) / 2 * (-c) + offset;
    console.log(t + 'degrees');
  }, i * n);
}

const u = setInterval(sample, 1000, 50, 30);
