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
    const pathfolder = [
        'dashboard',
        'product',
        'users',
        'error',
    ];
    let pathname;
    const basefolder = path.join(__dirname, 'pages');
    const foldername = req.url.split('/')[1] || 'dashboard';
    const filename = req.url.split('/')[2] || 'index.html';
    for(const folder of pathfolder){
        if(folder === foldername){
            const pathstring = path.join(basefolder, folder, filename);
            if(fs.existsSync(pathstring) && fs.lstatSync(pathstring).isFile()){
                pathname = pathstring;
            }
            break;
        }   
    }

    if (fs.existsSync(pathname) && fs.lstatSync(pathname).isFile()) { // if the path exists and if it's a file (not a folder)
        const ext = path.extname(pathname);
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
        res.writeHead(200, { 'Content-Type' : contentType });
        fs.createReadStream(pathname).pipe(res); // reading the file as a stream of data instead of as a file
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