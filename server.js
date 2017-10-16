var express = require('express');
var request = require('request');
var app = express();
var php_shit_url = "http://localhost/phps/";
var bodyParser = require('body-parser');
var sql = require("mssql");


//app.use(bodyParser.json());
// config for your database
var config = {
    user: 'sa',
    password: 'acca12345',
    server: 'ENNNIMA-DEV\\SQLEXPRESS', 
    database: 'SOA' 
};

    // // connect to your database
    // sql.connect(config, function (err) {
    
    //     if (err) console.log(err);

    //     // create Request object
    //     var request = new sql.Request();
           
    //     // query to the database and get the records
    //     request.query('select * from usuarios', function (err, recordset) {
            
    //         if (err) console.log(err)

    //         // send records as a response
    //         //res.send(recordset);
    //         console.log(recordset.rowsAffected);
    //         sql.close();
    //     });
    // });
////////////////////////////////  Model Functions //////////////////


function db_query(query){

    var resultado = ''; 
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            //res.send(recordset);
            resultado = recordset;
            
            sql.close();


        });
        
    });
    console.log(resultado);
    return resultado;
}


// Esto ayuda a que un HTML externo lo pueda consumir
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});



// Prueba si está viendo la base de datos
app.get('/sql_test', function(req, res){
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from usuarios', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            console.log(recordset);
            sql.close();
        });
    });


});


app.post('/login', function(req, res){
  // var user_rfc = req.params.rfc;
  // var user_pass = req.params.pass;
  // db_query('select * from usuarios');
  // res.send("Eviado: " + user_rfc + user_pass);

  console.log(req.body);
});



// app.get('/login/:id', function(req, res) { 
//        if (!req.params.id) { 
//            res.status(500); 
//            res.send({"Error": "Looks like you are not senging the product id to get the product details."}); 
//            console.log("Looks like you are not senging the product id to get the product detsails."); 
//        } 
//       request.get({ url: php_shit_url+"shitsita.php?nombre=" + req.params.id },      function(error, response, body) { 
//               if (!error && response.statusCode == 200) { 
//                   //res.json(body); 
//                   //console.log(body);
//                   var msg = JSON.parse(body);
//                   console.log(msg.edad-10);
//                   var newJson = {"cupon":msg.edad-10,"acceso":"sexshop","color":msg.color};
//                   res.json(newJson);
//                  } 
//              }); 
//      }); 


/////////  Corre una instancia que sirve por http
app.listen(3000, function(err){
	if(err){
		return console.log("Hubo un error");
		process.exit(1);
	}else{
		console.log('TEST API exuchando en el puerto 3000');
	}
});