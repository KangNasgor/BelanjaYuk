const http = require('http');
const mysql = require('mysql2');
const dashboard = require('./pages/dashboard/route')

const db = mysql.createPool({
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'nodejs',
    port : 3306,
});

db.getConnection((err, connection) => {
    if(err){
        console.error("Error mas");
    }
    else{
        console.log("Success!");
        connection.release();
    }
});

const server = http.createServer((req, res) => {
    if(req.url === "/" && req.method === 'GET'){
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.statusCode = 200;
        res.write('<h1>Aku Node JS</h1>');
        res.end();
    }
    else if(req.url === '/users' && req.method === 'GET'){
        db.query('SELECT * FROM users', (err, result) => {
            if(err){
                res.writeHead(500, {"Content-Type" : "application/json"});
                res.end(JSON.stringify({error : "error mas"}));
            }
            res.writeHead(200, {"Content-Type" : "application/json"});
            res.end(JSON.stringify(result));
        });
    }
    else if(req.url === '/dashboard' && req.method === 'GET'){
        dashboard(req, res);
    }
    else{
        res.writeHead(404, {'Content-Type' : 'text/plain'})
        res.end('Not Found');
    }
})

const port = 3000;
server.listen(port, () => {
    console.log(`Aku NodeJS njir, Port : ${port}`);
})