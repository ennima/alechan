var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send("Hola Mundo!");
});

app.listen(3000, function(err){
	if(err){
		return console.log("Hubo un error");
		process.exit(1);
	}else{
		console.log('TEST API exuchando en el puerto 3000');
	}
});