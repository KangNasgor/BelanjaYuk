// Modules
const http = require('http');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
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
    const pathname = path.join(__dirname, 'pages/dashboard', req.url);

    if (fs.existsSync(pathname) && fs.lstatSync(pathname).isFile()) { // if the path exists and if it's a file (not a folder)
        const ext = path.extname(req.url);
        let contentType = 'text/plain';
        switch (ext) { // determining the code type
            case '.html':
                contentType = 'text/html';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'application/javascript';
                break;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(pathname).pipe(res); // reading the javascript file as a stream of data instead as a file
        return;
    }
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
    console.log(`http://localhost:3000`);
})