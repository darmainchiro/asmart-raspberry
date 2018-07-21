const Gpio = require('onoff').Gpio;
const led = new Gpio(4, 'out');
const sleep = require('sleep').sleep;

while(true) {
 led.writeSync(1);
 sleep(1);
 led.writeSync(0);
 sleep(1);
}

