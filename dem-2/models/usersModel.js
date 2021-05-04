const client = require("../dbConnect.js");

class usersModel {
    async authUser(phone, password) {
        return await client.query(`SELECT id_user, name, phone, email FROM users WHERE phone = '${phone}' AND password = '${password}'`);
    }

    async addNewUser(userData) {
        const {name, phone, password, email} = userData

        const {rows} = await client.query(`SELECT phone FROM users WHERE phone = '${phone}'`);

        if(rows.length === 0) {
            await client.query(`INSERT INTO users (name, phone, email, password) VALUES ('${name}', '${phone}', '${email}', '${password}')`);
            return {
                status: "ok",
                data: [],
                message: ""
            }
        }

        else {
            return {
                status: "error",
                data: [],
                message: "User with this phone number is already exist"
            }
        }
    }
}

const usersMod = new usersModel();

module.exports = usersMod;