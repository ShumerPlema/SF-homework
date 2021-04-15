exports.reg = function(query, res, fs) {

    let users = require("../users.json");

    const regularExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regularExpPassword = /^.*(?=.{6,50})(?=.*d)(?=.*[A-Z])(?=.*[a-z]).*$/;

    delete query["reg"];

    for(let key in query) {
        if(key === "name") {
            if(query[key].length > 50 || query[key].length < 1) {
                res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                res.write("<h1>Incorrect name</h1>")
                return false;
            }
        }
        else if(key === "surname") {
            if(query[key].length > 50 || query[key].length < 1) {
                res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                res.write("<h1>Incorrect surname</h1>");
                return false;
            }
        }
        else if(key === "login") {
            if(query[key].length > 50 || query[key].length < 1) {
                res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                res.write("<h1>Incorrect login</h1>");
                return false;
            }

            for(let userObj of users) {
                if(userObj[key] === query[key]) {
                    res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                    res.write("<h1>This login is already taken</h1>");
                    return false;
                }
            }
        }
        else if(key === "email") {
            if(!regularExpEmail.test(query[key])) {
                res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                res.write("<h1>Incorrect email</h1>");
                return false;
            }
        }
        else if(key === "password") {
            if(!regularExpPassword.test(query[key])) {
                res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                res.write("<h1>Incorrect password</h1>");
                return false;
            }
        }
        else if(key === "dob") {
            let dateArr = query[key].split("/");
            let date = new Date(dateArr[0] + "/" + dateArr[1] + "/" + dateArr[2] + "");
            if((date.getFullYear()  != dateArr[0]) && (date.getMonth() != dateArr[1]) && (date.getDate() != dateArr[0])) {
                res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                res.write("<h1>Incorrect date</h1>");
                return false;
            }
        }
    }

    users.push(query);

    users = JSON.stringify(users);

    fs.writeFile("users.json", users, err => {
        if(err) {
            console.log(err);
        }
    })

    return true;
}