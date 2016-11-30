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

  console.log("サーバーに接続されました。");

  client.on('message', function(msg) {
		client.send(msg);
		client.broadcast.emit('message', msg);
	});

  client.on('disconnect', function(){
    console.log('接続を解除しました。');
  });

  client.on("publish", function(data){
    console.log(data);
    io.emit("publishMap", {lat: data.lat, lng: data.lng});
  });

  client.on("startSocket", function(e){
    console.log(e);
  })

  client.on("stopSocket", function(e){
    console.log(e);
  })

});
