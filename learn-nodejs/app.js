var fs = require('fs');

//create file using module
fs.writeFileSync('demo.txt', 'Node.js is an open source server environment.');
console.log('File is created successfully.');


//Read content
var demo = fs.readFileSync('demo.txt', 'utf8');
console.log(demo);


//append data 
fs.appendFileSync('demo.txt',' Node.js allows you to run JavaScript on the server.');
console.log("File appended successfully");

var appendedFile = fs.readFileSync('demo.txt', 'utf8');
console.log(appendedFile);


//Rename it

fs.renameSync('demo.txt','final-demo.txt');
console.log('File name renamed');



//Delete it
fs.unlinkSync('final-demo.txt');
console.log('File deleted');
 

//Run on server
// var http = require('http');
// var fs = require('fs');
// var server = http.createServer(function(req, res){
//         console.log('request was made: ' + req.url);
//          res.writeHead(200, {'content-Type': 'text/plain'});
//          var myReadStream = fs.createReadStream(__dirname + '/demo.txt', 'utf8');
//          myReadStream.pipe(res);
//     });
 
// server.listen(3300, '127.0.0.1');
// console.log('you are now listening to port 3300');
