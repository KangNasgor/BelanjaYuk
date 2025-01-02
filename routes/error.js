const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const pathName = path.join(__dirname, '../pages/error', 'index.html');
    fs.readFile(pathName, 'utf-8', (err, data) => {
        if(err){
            res.writeHead(404, {'Content-Type' : 'text/html'});
            res.end('Page not found');
        }
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(data);
    })
}