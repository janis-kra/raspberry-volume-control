const exec = require('child_process').exec;

const log = (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
};

const max = 400;
const min = -10200;
const normalize = volume => ((max - min) * volume) - max;

let currentVolume = 0;

const setVolume = (volume) => {
  if (typeof volume !== 'number') {
    throw new TypeError(`expected an instance of number, instead got ${typeof volume}`);
  }

  let normalized;
  if (volume > 1) {
    normalized = max;
  } else if (volume < 0) {
    normalized = min;
  } else {
    normalized = normalize(volume);
  }

  exec(`amixer cset numid=1 -- ${normalized}`, log);
  currentVolume = normalized;
  return currentVolume;
};

module.exports = {
  decrease: () => setVolume(currentVolume - 0.1),
  increase: () => setVolume(currentVolume + 0.1),
  up: () => 0,
  down: () => setVolume(),
  mute: () => setVolume(0),
  unmute: () => setVolume(1),
  get: () => currentVolume,
  set: volume => setVolume(volume)
};
