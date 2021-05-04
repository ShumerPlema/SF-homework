const http = require('http');
const url = require('url');
const fs = require('fs');
const { reg } = require('./src/reg');
const { auth } = require('./src/auth')

http.createServer((req, res) => {

    let query = url.parse(req.url, true).query;
    let keys = Object.keys(query);

    switch (keys[0]) {
        case "reg":
            if(reg(query,res ,fs)) {
                res.writeHead(200, { 'Content-Type' : 'text/html' });
                res.write("<h1>Added new users</h1>")
            }
            break;

        case "auth":

            let result = auth(query, res)
            if(result["status"]) {
                let {name, surname, login, password, email, dob} = result["user"];
                res.writeHead(200, "{ 'Content-Type' : 'text/html' }");
                res.write(`
                    <h1>Hello ${name}!</h1></br>
                    <h2>This is your data </h2></br>
                    <ul>
                        <li>Name: ${name}</li>
                        <li>Surname: ${surname}</li>
                        <li>Login: ${login}</li>
                        <li>Password: ${password}</li>
                        <li>E-mail: ${email}</li>
                        <li>Date of birthday: ${dob}</li>
                    </ul>
                `)
            }
            else {
                res.writeHead(200, "{ 'Content-Type' : 'text/html' }");
                res.write("<h1>Incorrect login or password</h1>");
            }
            break;
    };

    res.end()
}).listen(5500);

console.log("http://localhost:5500/?auth&login=robin27&password=Password12345678");
console.log("http://localhost:5500/?reg&name=Robin&surname=Good&login=robin27&password=Password12345678&email=robingmail.com&dob=1998%2F01%2F01");
