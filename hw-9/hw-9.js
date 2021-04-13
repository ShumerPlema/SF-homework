const http = require('http');
const url = require('url');
const { drawChessDesk } = require("./task1.js");
const { attachmentEnvelopes } = require("./task2")
const nerdamer = require("nerdamer")

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html' });

    const query = url.parse(req.url, true).query;
    const envelope1 = {
        a: +query.a,
        b: +query.b
    };
    const envelope2 = {
        c: +query.c,
        d: +query.d,
    };

    switch (query.task) {
        case "1":
            res.write(`<div>${drawChessDesk(+query.h,+query.w, query.el)}</div>`);
            break;

        case "2":
            res.write(`<div>${attachmentEnvelopes(envelope1, envelope2)}</div>`);
            break;

        default:
            res.write(`<div><h1>Таска под номер ${query.task} нету</h1>></div>`);
    }
    res.end();
}).listen(5500);

