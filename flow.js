var gpio = require('rpi-gpio');

gpio.setup(22, gpio.DIR_IN, readInput);

function readInput(err){
	if(err) throw err;
	gpio.read(22, function(err,value) {
		if(err) throw err;
		console.log('value'+ value);
	});
}
