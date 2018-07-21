const Gpio = require('onoff').Gpio;
const socket = require('socket.io-client');
const request = require('request');
const proses = require('child_process').exec;

//const io = socket('http://192.168.43.69:3042/');
const io = socket('https://guna.jagopesan.com/');

io.on('relay1', (result) => {
 console.log(result.msg);
 var led4 = new Gpio(4, 'out');
 led4.writeSync(Number(result.msg));

 //var data = {};

 //request.post(URL, {form: data}, (err, respn, bdy) => {
  //console.log(respn);
 //});

 //proses('sudo systemctl start waterflow.service', (err, stout, sterr) => {
  //console.log('service waterflow starting...');
 //});
});
