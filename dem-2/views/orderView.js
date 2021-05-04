const transporter = require("../mailerConnect.js")

class OrderView {
    sendData(res, data) {
        if(data.status === "error") {
            res.json(data);
        }
        else {
            this.sendMail(data.mail);
            res.end()
        }
    }

    sendMail(data) {
        const message = {
            from: "<ivanrumun759@gmail.com>",
            to: "marderosov7@gmail.com",
            subject: "New order",
            html: data

        }

        transporter.sendMail(message, (err, info) => {
            if(err) {
                return console.log(err);
            }
            console.log("Message sending");
            console.log(info);
        });
    }
}

const orderView = new OrderView();

module.exports = orderView;