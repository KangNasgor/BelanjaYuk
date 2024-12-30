const fs = require('fs');
const path = require('path');

module.exports = ((req, res) => {
    const pathname = path.join(__dirname, '../pages/product', 'index.html');
    fs.readFile(pathname, (err, data) => {
        if(err){
            res.writeHead(500, {'Content-Type' : 'text/plain'});
            res.end('Internal server error');
        }
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(data);
    })
});
