const http = require("http");
const url = require("url");
const {reg} = require("./src/reg");
const {auth} = require("./src/auth");
const paths = require("./src/path");



http.createServer((req, res) => {

    const path = url.parse(req.url, true).pathname;
    const qur = url.parse(req.url, true).query;

    switch (path) {
        case paths.reg:
            reg(res, qur);
            break;

        case paths.auth:
            auth(res, qur);
            break;

        default:
            res.end()
            break;
    }
}).listen(5500);
console.log("http://localhost:5500/reg/?name=Olga&surname=Surnin&login=OlSur&password=Password12345678&email=olga@gmailrs.com&dob=1998%2F01%2F01");
console.log("http://localhost:5500/auth/?login=ElGrish&password=Password12345678")
