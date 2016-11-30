var http = require("http");
var fs = require("fs");

var server = http.createServer();
server.on("request", function(req, res){
  fs.readFile("./index.html", "UTF-8", function(err, data){
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.end();
  });
}).listen(process.env.PORT || 8000);


var io = require("socket.io")(server);
io.on("connection", function(client){

  client.on('disconnect', function(){
    io.sockets.emit('Messages', false);
  });

  client.on("setStart", function(data){
    io.sockets.emit('Messages', data);
  });

});
