const {validation} = require("./validation")
const client = require("./dbConnect");

exports.reg = function (res, qur) {
    client.query("SELECT * FROM client", (err, result) => {
        if (err) {
            console.log(err);
        }

        if (validation(res, qur, result.rows)) {
            let currentId = result.rows[result.rows.length - 1].id;
            let values = [...Object.values(qur)];

            client.query(`INSERT INTO CLIENT (id, firstname, lastname, login, password, email, dbo) VALUES (${currentId + 1},$1, $2,$3, $4, $5, $6)`, values, (err, result) => {
                if (err) {
                    console.log(err);
                }

                res.writeHead(200, "{ 'Content-Type' : 'text/html' }");
                res.write("<h1>Add new user</h1>");
                res.end();
            })
        } else {
            res.end();
        }
    })
}
