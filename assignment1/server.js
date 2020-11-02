// load the node.js express web application framework
const express = require("express");

// create an Express application using the constant declared above
const app = express();

// load the node.js file system moudle
const fs = require("fs");

// define the HTTP port to listen on 
const port = 8081;

// define a user object to use for the addUser URI
var user = {
    "user4" : {
        "name" : "daniel",
        "password" : "xyz",
        "profession" : "chaldean wiseman",
        "id" : "4"
    }
}

// Define HTTP POST handler for the "/addUser" URI
app.post('/addUser', function (req, res) {
    fs.readFile( __dirname + "\\" + "users.json", "utf8", function (err,data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log ( data );
       res.end( JSON.stringify(data));
    });
});

// Define HTTP GET handler for the "/:id" URI
app.get('/:id', function(req,res){
   fs.readFile(__dirname + '\\' + 'users.json', 'utf8', function(err,data){
        var users = JSON.parse ( data );
        var user = users["user" + req.params.id];
        console.log ( user );
        res.end(JSON.stringify(user));
   });
});

// Define HTTP GET handler for the "/listUsers" URI
app.get('/listUsers', function(req,res){
    fs.readFile(__dirname + '\\' + 'users.json', 'utf8', function(err,data){        
         console.log( data );        
         res.end(data);
    });
 });

app.delete("/deleteUser", function(req,res){
    fs.readFile( __dirname + "\\" + "users.json", "utf8", function (err,data) {
        data = JSON.parse( data );
        delete data["user2"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

// launch the http server listening on port 8081
const server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})