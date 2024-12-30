const fs = require('fs');
const path = require('path');
const db = require('../db');

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = ((req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if(err){
            res.writeHead(500, {"Content-Type" : "application/json"});
            res.end(JSON.stringify({error : "Internal Server Error"}));
        }
        const pathname = path.join(__dirname, '../pages/users', 'index.html');
        fs.readFile(pathname, 'utf-8', (err, data) => {
            if(err){
                res.writeHead(500, {"Content-Type" : "text/html"});
                res.end("Internal Server Error");
            }
            const users = result.map(user => `<li>${capitalize(user.name)} ${user.email}</li>`).join(''); // Iterate the result of sql query and assign it to html list
            const replacedUsers = data.replace('{{users}}', users); // replacing {{users}} from the html page to the list of users

            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(replacedUsers);
        });
    });
});
