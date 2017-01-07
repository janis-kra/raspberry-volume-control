const test = require('ava'); // eslint-disable-line

const volume = () => require('./index.js');

test('get', t => t.is(volume().get(), 0));

test('set max volume', (t) => {
  const vol = volume();
  vol.set(1);
  t.is(vol.get(), 1);
});

test('set 0.5 volume', (t) => {
  const vol = volume();
  vol.set(0.5);
  t.is(vol.get(), 0.5);
});

test('mute', t => t.is(volume().mute(), 0));

test('unmute', t => t.is(volume().unmute(), 1));
