const moment = require('moment');
const fs = require('fs');

fs.readFile('test-2018-04-20T20:35:40.731Z.dat', (rErr, text) => {
  if (rErr) throw rErr;
  const data = text.toString().split('\n').map(line => line.split(' '));
  data.forEach(d => d.push(moment(d[0], 'x').add(1, 'h').format()));
  fs.writeFile('test-times.dat', data.reduce((d, a) => d + '\n' + a, ''),
    wErr => { if (wErr) throw wErr; }
  );
});
