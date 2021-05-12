const {UserModel} = require("../database/models/usersModel");
const {Op} = require("sequelize")

class usersModules {
    async authUser(phone, password) {
        return await UserModel.findOne({
            where: {
                [Op.and]:[
                    {phone: phone},
                    {password: password}
                ]
            }
        })
        // return await client.query(`SELECT id_user, name, phone, email FROM users WHERE phone = '${phone}' AND password = '${password}'`);
    }

    async addNewUser(userData) {
        const {name, phone, password, email} = userData

        const users = UserModel.findAll({
            attributes: [
                "phone"
            ],
            where: {
                phone: phone,
            }
        })

        // const {rows} = await client.query(`SELECT phone FROM users WHERE phone = '${phone}'`);

        if(users.length === 0) {
            await UserModel.create({
                name,
                phone,
                email,
                password
            })
            // await client.query(`INSERT INTO users (name, phone, email, password) VALUES ('${name}', '${phone}', '${email}', '${password}')`);
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

const usersMod = new usersModules();

module.exports = usersMod;