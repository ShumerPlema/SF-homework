const client = require("../dbConnect.js");

class OrderModel {
    async newOrder(queryValue) {

        const validateProductsRes = await this.validateProducts(queryValue);

        if (validateProductsRes.status === "error") {
            return validateProductsRes;
        }

        const validateUserRes = await this.validateUser(queryValue);

        if (validateUserRes.status === "error") {
            return validateUserRes;
        }


        const usersPhones = await client.query(`SELECT phone FROM users WHERE phone = '${queryValue.user.phone}'`);

        if (usersPhones.rows.length === 0) {
            return this.addNewUser(queryValue);
        }

        if (usersPhones.rows.length !== 0) {
            return this.addProductsToOrder(queryValue);
        }
    }

    async orderInfo(queryValue, idOrder) {

        const sortedQueryValue = queryValue.products.sort((a, b) => a.id - b.id)
        const prodIdArr = sortedQueryValue.map(el => el.id).sort((a, b) => a - b)
        const prodAmountArr = queryValue.products.map(el => el.count)
        const prodInfo = await client.query(`SELECT products.id_product, products.product, products.price, units.unit
                                          FROM products
                                          INNER JOIN units
                                          ON units.id_unit = products.id_unit
                                          WHERE id_product IN (${prodIdArr.join(",")})`)

        const orderInfoObj = {
            user: {
                name: queryValue.user.name,
                phone: queryValue.user.phone,
                email: queryValue.user.email
            },
            orderProducts: [],
            otherInfo: {
                id_order: idOrder.rows[idOrder.rows.length - 1].id_order,
                total_price: ""
            }
        }

        prodInfo.rows.map((el, index) => {
            orderInfoObj.orderProducts.push(el);
        })
        orderInfoObj.orderProducts.map((el, index) => {
            return el.count = prodAmountArr[index]
        })

        orderInfoObj.orderProducts.map((el) => {
            el.product_price = el.price * el.count;
        })

        orderInfoObj.otherInfo.total_price = orderInfoObj.orderProducts.reduce((acc, el) => acc + el.product_price, 0)

        return this.orderMail(orderInfoObj);
    }

    orderMail(orderInfo) {

        console.log(orderInfo.orderProducts)

        const orderTemplate = orderInfo.orderProducts.reduce((acc, el) => {
            const prodObj = Object.values(el).reduce((accum, element) => {
                return accum.concat(`<td>${element}</td>`);
            },"")
            return acc.concat(`<tr>${prodObj}</tr>`)
        },"")

        const userTemplate = Object.values(orderInfo.user).reduce((acc, el) => {
            return acc.concat(`<td>${el}</td>`)
        },"")

        const mail = `<h1>Order number: ${orderInfo.otherInfo.id_order}</h1>
            
            <table border="1" cellpadding="5">
                <tr><td>Name:</td><td>Phone:</td><td>E-mail</tr>
                <tr>${userTemplate}</tr>
            </table>
            
            <p>See below for more details about your order</p>
            
            <table border="1" cellpadding="5">
                <tr><td>Product id:</td><td>Product name:</td><td>Price:</td><td>Units:</td><td>Count:</td><td>Price per item:</td></tr>
                ${orderTemplate}
            </table>
            <p><b>Total price: ${orderInfo.otherInfo.total_price}</b></p>`

        return {
            status: "ok",
            mail: mail,
        }
    }

    async addProductsToOrder(queryValue) {
        const idUser = await client.query(`SELECT id_user FROM users WHERE phone = '${queryValue.user.phone}'`);
        await client.query(`INSERT INTO orders (id_user) VALUES (${idUser.rows[0].id_user})`);
        const idOrder = await client.query(`SELECT id_order FROM orders WHERE id_user = ${idUser.rows[0].id_user} ORDER BY id_order`);

        for (let i = 0; i < queryValue.products.length; i++) {
            await client.query(`INSERT INTO orderitem (id_order, id_product, quantity)
            VALUES ('${idOrder.rows[idOrder.rows.length - 1].id_order}',
            '${queryValue.products[i].id}',
            '${queryValue.products[i].count}')`)
        }

        return await this.orderInfo(queryValue, idOrder);
    }

    async addNewUser(queryValue) {
        await client.query(`INSERT INTO users (name, email, phone) VALUES ('${queryValue.user.name}', '${queryValue.user.email}', '${queryValue.user.phone}')`)
        return this.addProductsToOrder(queryValue);
    }

    async validateUser(queryValue) {
        const errorObj = {
            status: "error",
            data: [],
            message: "User info is not valid"
        }

        if(!("user" in queryValue)) {
            return {
                status: "error",
                data: [],
                message: "The key 'user' missing"
            }
        }

        const regularExpName = /^[A-ZА-Я][a-zA-Zа-яА-Я ,.'-]{1,30}$/
        const regularExpPhone = /^380\d{9}$/;
        const regularExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regularExpName.test(queryValue.user.name)) {
            return errorObj;
        }

        if (!regularExpPhone.test(queryValue.user.phone) || typeof(queryValue.user.phone) !== "string") {
            return errorObj;
        }

        if (!regularExpEmail.test(queryValue.user.email)) {
            queryValue.user.email = "NULL";
        }

        return {
            status: "ok",
            data: [],
            message: ""
        }
    }

    async validateProducts(queryValue) {

        if(!("products" in queryValue)) {
            return {
                status: "error",
                data: [],
                message: "The key 'products' missing"
            }
        }

        if(queryValue.products.length === 0) {
            return {
                status: "error",
                data: [],
                message: "Products are empty"
            }
        }

        const validateIdProductsRes = await this.validateIdProducts(queryValue.products);

        if (validateIdProductsRes.status === "error") {
            return validateIdProductsRes;
        }

        const validateCountProductsRes = await this.validateCountProducts(queryValue.products);

        if (validateCountProductsRes.status === "error") {
            return validateCountProductsRes;
        }

        return {
            status: "ok",
            data: [],
            message: ""
        }
    }

    async validateIdProducts(queryValue) {
        const idProduct = await client.query("SELECT id_product FROM products");
        const queryValueArr = queryValue.map(el => el.id);
        const idProductArr = [...idProduct.rows].map(el => el.id_product);
        let validateProdId = queryValueArr.every(el => idProductArr.includes(el));
        let idIsValid = true;

        if (!validateProdId) {
            idIsValid = false;
        }

        if (idIsValid) {
            return {
                status: "ok",
                data: [],
                message: "",
            }
        } else {
            return {
                status: "error",
                data: queryValue,
                message: `Products are not found`
            }
        }
    }

    async validateCountProducts(queryValue) {
        const queryValueId = queryValue.map(el => el.id);
        const queryValueCount = queryValue.map(el => el.count);
        let countIsValid = true;

       let incorrectCount = queryValueCount.filter(el => el <= 0);

       if (incorrectCount.length >= 1) {
           return {
               status: "error",
               data: [],
               message: "Incorrect values of count"
           }
       }

        if (queryValueCount.filter(el => Number.isInteger(el)).length !== queryValueCount.length) {
            return {
                status: "error",
                data: [],
                message: "Incorrect values of count"
            }
        }

        const amountProduct = await client.query(`SELECT id_product, amount FROM products WHERE id_product IN (${queryValueId.join(",")})`);

        for (let i = 0; i < queryValueCount.length; i++) {
            if (queryValueCount[i] > amountProduct.rows[i].amount) {
                countIsValid = false
            }
        }

        if (countIsValid) {
            return {
                status: "ok",
                data: [],
                message: ""
            }
        } else {
            return {
                status: "error",
                data: amountProduct.rows,
                message: "Not enough products"
            }
        }
    }

}

const orderMod = new OrderModel();

module.exports = orderMod;