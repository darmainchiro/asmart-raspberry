var url_get = "http://localhost:3042/conditions/volume"
var Request = require("request");

Request.get(url_get, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    var aji = JSON.parse(body);
    var aku = aji.volume;
    console.log(aku);
});