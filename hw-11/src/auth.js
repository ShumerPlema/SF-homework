const client = require("./dbConnect");

exports.auth = function (res, qur) {
    client.query("SELECT * FROM client", (err, result) => {
        if (err) {
            console.log(err);
        }

        let user = result.rows.find(item => item.login === qur.login && item.password === qur.password)

        res.writeHead(200, { 'Content-Type' : 'text/html' });
        if (user) {
            res.write(`
                <h1>Hello, ${user.firstname}</h1>
                <h1>This is your data</h1>
                <ul>
                    <li>Name: ${user.firstname}</li>
                    <li>Surname: ${user.lastname}</li>
                    <li>Login: ${user.login}</li>
                    <li>Password: ${user.password}</li>
                    <li>E-mail: ${user.email}</li>
                    <li>Date of birthday: ${user.dbo+1}</li>
                </ul>
            `);
        } else {
            res.write("<h1>Incorrect login or password</h1>");
        }
        res.end()
    })
}