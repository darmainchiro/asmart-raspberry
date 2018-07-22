var io      = require ('socket.io-client');
var sc      = io.connect('https://guna.jagopesan.com/');
var gpio    = require('onoff').Gpio;
var Client  = require('node-rest-client').Client;
var client  = new Client();
var url_get = "https://guna.jagopesan.com/conditions/volume";
var url_post= "https://guna.jagopesan.com/water"
var Request = require("request");

//declare gpio
var RELAY1 = new gpio(2,'out');
var RELAY2 = new gpio(3,'out');

RELAY1.writeSync(1);
RELAY2.writeSync(1);

sc.on('relay1', (data) =>{
  if(data.msg){
  console.log('relay aktif: ', data.msg);
  Request.get(url_get, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    var aji = JSON.parse(body);
    var aku = aji.volume;
    console.log(aku);
  });
  RELAY1.writeSync(0);
  req.post({url: url_post, form: aku.volume}, function(err, rst, body){
    if(err) return console.log(err);
    console.log("data history terkirim");
  })
  }else{
   RELAY1.writeSync(1);
   console.log('relay aktif: ',data.msg);
  }
});
sc.on('statuswater', (data) =>{
 if(data.msg){
	console.log('relay2 aktif: ', data.msg);
	RELAY2.writeSync(0);
 }else{
 RELAY2.writeSync(1);
 console.log('relay2 aktif: ', data.msg);
 }
});

