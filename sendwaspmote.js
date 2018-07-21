var mongoose = require('mongoose');
var SerialPort = require('serialport');
var Readline = SerialPort.parsers.Readline;
var io = require('socket.io-client');
var sc = io.connect('alamat_url');
var req= require('request');
//var url= "https://guna.jagopesan.com/conditions";
var url= "http://192.168.43.69:3042/conditions";
var time = new Date();
var sayuran = 'jagung';
var tokenAji = "cJS4WY-oDqQ:APA91bEKKeKmiqh5uUZ8DP30DZabNsQb1uYua3rtrFh2vfjc5OKCXGVOcUujn3bkxeIaee7RVgaw86nRFJQi7bFNKqyfirlSOa3wfjAxflvjbOtv2u0wNsa0cOY6ychNzyHxoZihN2oO";


var serialPort = new SerialPort('/dev/ttyUSB0', {
  baudRate: 115200,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

var isReadyOpen = false

var parser = new Readline();
serialPort.pipe(parser);
parser.on('data', function (data) {
	if(isReadyOpen){
		var sensor = data.split('#');
		var dataSensor = sensor.slice(6, 12) 
		var nativeJson = '{'
		for(var i = 0 ; i<dataSensor.length ; i++) {
			var piece = dataSensor[i].split(":")
			if(i < dataSensor.length - 1)
				nativeJson += '"'+piece[0]+'":'+'"'+piece[1]+'",'
			else 
				nativeJson += '"'+piece[0]+'":'+'"'+piece[1]+'"}'
		}
		var dataJSON = JSON.parse(nativeJson)
		console.log(dataJSON)
		var datasensor = {'sayuran': sayuran, 'time': time,'soilmoisture': dataJSON.SOIL, 'airpressure': dataJSON.PA,'temperature': dataJSON.TCB,'humidity': dataJSON.HUMB,'batteray': dataJSON.BAT, 'volume': dataJSON.STR};
		notifikasi(dataJSON.SOIL, dataJSON.HUMB, dataJSON.STR);
		req.post({url: url, form: datasensor}, function(err, rst, body){
			if(err) return console.log(err);
			console.log("data terkirim");
		})
	}

	if(!isReadyOpen){
		isReadyOpen = true
	}
});

serialPort.on('open', function () {
  console.log("sukses")
});

function notifikasi(soil, humb, fuzzy) {
	if(humb < 75 && soil < 50){
		var FCM = require('./sendMessage').sendMessageToDevice;
		FCM(tokenAji, "Warning on Your Plant", "You must to watering the plant");
	}
}
