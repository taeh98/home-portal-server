let http = require("http");
let fs = require("fs");
let path = require("path");
const port = 8080;

http.createServer(function (request, response) {
    console.log("request ", request.url);

    const webFiles = __dirname + "/webFiles";

    var filePath = webFiles + request.url;
    if (request.url == "/") {
        filePath = webFiles + "/index.html";
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".gif": "image/gif",
        ".wav": "audio/wav",
        ".mp4": "video/mp4",
        ".woff": "application/font-woff",
        ".ttf": "application/font-ttf",
        ".eot": "application/vnd.ms-fontobject",
        ".otf": "application/font-otf",
        ".svg": "application/image/svg+xml"
    };

    var contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == "ENOENT") {
                fs.readFile(webFiles + "/404.html", function(error, content) {
                    response.writeHead(200, { "Content-Type": contentType });
                    response.end(content, "utf-8");
                });
            }
            else {
                response.writeHead(500);
                response.end("Sorry, check with the site admin for error: " + error.code + " ..\n");
                response.end();
            }
        }
        else {
            response.writeHead(200, { "Content-Type": contentType });
            response.end(content, "utf-8");
        }
    });

}).listen(port);
console.log("Portal servre running on local port " + port + ".");