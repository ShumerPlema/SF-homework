exports.validation = function(res, qur, dbRes) {

    const regularExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regularExpPassword = /^.*(?=.{6,50})(?=.*d)(?=.*[A-Z])(?=.*[a-z]).*$/;

    for (let key in qur) {
        if (key === "name" || key === "surname") {
            if (qur[key].length > 50 || qur[key].length < 1) {
                res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                res.write(`<h1>Incorrect ${key}</h1>`);
                return false;
            }
        }
        if (key === "login") {
            if (qur[key].length > 50 || qur[key].length < 1) {
                res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                res.write(`Incorrect ${key}`)
                return false;
            } else {
                if (dbRes.find(item => item.login === qur.login)) {
                    res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                    res.write(`<h1>This ${key} already exists</h1>`);
                    return false;
                }
            }
        }
        if (key === "email") {
            if (!regularExpEmail.test(qur[key])) {
                res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                res.write(`<h1>Incorrect ${key}</h1>`);
                return false;
            } else {
                if (dbRes.find(item => item.email === qur.email)) {
                    res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                    res.write(`<h1>This ${key} already exists</h1>`);
                    return false;
                }
            }
        }
        if (key === "password") {
            if (!regularExpPassword.test(qur[key])) {
                res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                res.write(`<h1>Incorrect ${key}</h1>`);
                return false;
            }
        }
        if (key === "dob") {
            let dateArr = qur[key].split("/");
            let date = new Date(dateArr[0] + "/" + dateArr[1] + "/" + dateArr[2] + "");
            if ((date.getFullYear() != dateArr[0]) && (date.getMonth() != dateArr[1]) && (date.getDate() != dateArr[0])) {
                res.writeHead(418, "{ 'Content-Type' : 'text/html' }");
                res.write(`<h1>Incorrect ${key}</h1>`);
                return false;
            }
        }
    }
    return true;
}