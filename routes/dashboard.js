const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const pathName = path.join(__dirname, '../pages/dashboard', 'index.html');
    fs.readFile(pathName, 'utf-8', (err, data) => {
        if(err){
            res.writeHead(500, {'Content-Type' : 'text/plain'});
            res.end('Internal server error');
        }
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(data);
    }) 
}