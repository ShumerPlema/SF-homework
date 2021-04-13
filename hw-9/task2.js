const nerdamer = require("nerdamer")

function geom (smallRectangle, bigRectangle) {

    let [len, height] = Object.values(bigRectangle);
    let [smallLen, smallHeight] = Object.values(smallRectangle);
    let largeDiagonal = Math.sqrt(height ** 2 + len ** 2);

    nerdamer.set("SOLUTIONS_AS_OBJECT", true);

    let res  = nerdamer.solveEquations ([
        `${len ** 2} = (${len} - x)^2 + (${height} - y)^2`,
        `y * (${height} - y) = x * (${len} - x)`
    ])

    let maxW = Math.sqrt(res.x ** 2 + res.y ** 2);
    let diffLen = largeDiagonal - len;
    let tgTheta = Math.tan(Math.atan(maxW / diffLen));
    let maxHeight = (largeDiagonal - smallLen) * tgTheta;

    return smallHeight < maxHeight;
}

function attachmentEnvelopesErrors(envelopes1, envelopes2) {

    // Проверка не путсые ли аргументы
    if(typeof(envelopes1) === "undefined" || typeof(envelopes2) === "undefined") {
        return {
            status: "failed",
            reason: "Arguments are empty"
        }
    }

    // Проверка на количество ключей в объекте
    if(Object.keys(envelopes1).length !== 2 || Object.keys(envelopes2).length !== 2) {
        return {
            status: "failed",
            reason: "Invalid number of keys in the object"
        }
    }

    // Проверка на название ключей
    let keysNames = Object.keys(envelopes1).concat(Object.keys(envelopes2)).join("")
    if(keysNames !== "abcd") {
        return {
            status: "failed",
            reason: "Invalid names of keys"
        }
    }

    // Проверка на то что значение ключей числа
    let keysValues = Object.values(envelopes1).concat(Object.values(envelopes2))
    for(let value of keysValues) {
        if(typeof(value) !== "number" || isNaN(value) || Math.abs(value) === Infinity) {
            return {
                status: "failed",
                reason: "Value of the keys must be a number"
            }
        }
    }

    // Проверка на то что числа положительные
    for(let value of keysValues) {
        if(value < 0) {
            return {
                status: "failed",
                reason: "Value of the keys must be a positive number"
            }
        }
    }

    //Проверка на длину значений
    for(let value of keysValues) {
        if (value > 1000000 || value < 1) {
            return {
                status: "failed",
                reason: "The value of the keys must be in the range from 1 to 1000000"
            }
        }
    }

    return 10
}

exports.attachmentEnvelopes = function (envelopes1, envelopes2) {
    if(attachmentEnvelopesErrors(envelopes1, envelopes2) !== 10 ) {
        return attachmentEnvelopesErrors(envelopes1, envelopes2)
    }

    if ((envelopes1.a < envelopes2.c) && (envelopes1.b < envelopes2.d)) {
        return 1; // Первый можно вложить во второй
    }

    if ((envelopes1.a > envelopes2.c) && (envelopes1.b > envelopes2.d)) {
        return 2; // Второй можно вложить в первый
    }

    if((envelopes1.a * envelopes1.b) > (envelopes2.c * envelopes2.d)) {
        return geom(envelopes2, envelopes1) ? 2 : 0;
    }

    if((envelopes1.a * envelopes1.b) < (envelopes2.c * envelopes2.d)) {
        return geom(envelopes1, envelopes2) ? 1 : 0;
    }

    return 0;
}