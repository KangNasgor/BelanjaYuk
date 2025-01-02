// Modules
const http = require('http');
const mysql = require('mysql2');
// Pages
const dashboard = require('./routes/dashboard');
const product = require('./routes/product');
const users = require('./routes/users');
const error = require('./routes/error');
// Database
const db = require('./db');

db.getConnection((err, connection) => {
    if(err){
        console.error("Internal Database Error");
    }
    else{
        connection.release();
    }
});

const server = http.createServer((req, res) => {
    if(req.url === "/" && req.method === 'GET'){
        dashboard(req, res);
    }
    else if(req.url === '/users' && req.method === 'GET'){
        users(req, res);
    }
    else if(req.url === '/product' && req.method === 'GET'){
        product(req, res);
    }
    else{
        error(req, res);
    }
})

const port = 3000;
server.listen(port, () => {
    console.log(`Aku NodeJS njir, Port : ${port}`);
})