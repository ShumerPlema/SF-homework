const http = require('http');
const url = require('url');
const { drawChessDesk } = require("./task1.js");
const { attachmentEnvelopes } = require("./task2.js");
const { findPolindrom } = require("./task4.js");
const { findLuckyTicket } = require("./task5.js")
const { numericalSequence } = require("./task6.js")
const { fibonacciNumbers } = require("./task7")
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
    const contextTicket = {
        min: +query.min,
        max: +query.max,
    }
    const contextNumbers = {
        min: +query.min,
        max: +query.max,
        len: +query.len
    }
    switch (query.task) {
        case "1":
            res.write(`<pre>${drawChessDesk(+query.h,+query.w, query.el)}</pre>`);
            break;

        case "2":
            res.write(`<div>${attachmentEnvelopes(envelope1, envelope2)}</div>`);
            break;

        case "4":
            res.write(`<div>${findPolindrom(+query.palindrome)}</div>`)
            break;

        case "5":
            const {winner, simple_method, hard_method} = findLuckyTicket(contextTicket)
            res.write(`<div>Winner: ${winner} <br> Simple Method: ${simple_method} <br> Hard Method: ${hard_method}</div>`)

            break;

        case "6":
            res.write(`<div>${numericalSequence(+query.len, +query.square)}</div>`)
            break;

        case "7":
            res.write(`<div>${fibonacciNumbers(contextNumbers)}</div>`)
            break;

        default:
            res.write(`<div><h1>Are yoy teapot?</h1></div>`);
            break;
    }
    res.end();
}).listen(5500);

