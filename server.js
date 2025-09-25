const http = require('http');
const url = require('url');
const en = require('./lang/en/en.js');
const Utils = require('./modules/utils.js');

class ServerApp {
    constructor(port) {
        this.port = port;
        this.utils = new Utils();
        this.start();
    }

    handleRequest(req, res) {
        const q = url.parse(req.url, true);
        const qdata = q.query;

        const name = qdata.name || "User";
        let message = en.main
            .replace("%NAME%", name)
            .replace("%DATE%", this.utils.getDate());
            
        message = `<p style="color:blue">${message}</p>`;

        res.writeHead(200, { 'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*" });
        res.write(message);
        res.end();
    }

    start() {
        http.createServer((req, res) => this.handleRequest(req, res))
            .listen(this.port, () => {
                console.log("Server is running and listening");
            });
    }
}


const app = new ServerApp(8888);
