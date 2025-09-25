const utils = require('./modules/utils.js');
const http = require('http');
const url = require('url');
const en = require('./lang/en/en.js');



http.createServer(function(req, res) {
    const q = url.parse(req.url, true);
    const qdata = q.query;

    const name = qdata.name || "Guest";
    let messeage = en.main.replace("%NAME%", name).replace("%DATE%", utils.getDate());
    
    messeage = `<p style="color:blue">${messeage}</p>`;

    res.writeHead(200, {'Content-Type': 'text/html', "access-control-Allow-Origin" : "*"});
    res.write(messeage);
    res.end();

}).listen(8888);

console.log("Server is running and listening");