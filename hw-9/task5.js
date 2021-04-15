const context = {
    min: 422356,
    max: 654321,
}

function simpleMethod(arr) {

    let luckyTicket = 0;

    arr.map((el) => {

        let firstHalf = el.slice(0,3).reduce((a, b) => Number(a) + Number(b),0);
        let secondHalf = el.slice(3).reduce((a, b) => Number(a) + Number(b),0);

        if(firstHalf == secondHalf) luckyTicket ++;

    })

    return luckyTicket;
}

function hardMethod(arr) {
    let luckyTicket = 0;

    arr.map((el) => {

        let oddSum = 0;
        let notOddSum = 0;

        let allNumber = el.reduce((a, b) => {
            if(b % 2 == 0) {
                oddSum += Number(b);
            }

            else {
                notOddSum += Number(b) ;
            }
        });

        if(oddSum == notOddSum) luckyTicket ++;

    })

    return luckyTicket;
}

function findLuckyTicketErrors(context) {

    // Проверка на наличие аргументов
    if(typeof(context) === "undefined") {
        return {
            status: "failed",
            reason: "Argument are empty"
        }
    }

    //Проверка на пустоту объекта
    if(Object.keys(context).length === 0) {
        return {
            status: "failed",
            reason: "Object is empty"
        }
    }

    // Проверка на кол-во ключей в объекте
    if(Object.keys(context).length < 2) {
        return {
            status: "failed",
            reason: "Insufficient number of keys in the object"
        }
    }

    // Проверка на название ключей объекта
    if(Object.keys(context)[1] !== "max" || Object.keys(context)[0] !== "min") {
        return {
            status: "failed",
            reason: "Incorrect object key names"
        }
    }

    //Проверка на то что поля объекта это числа
    if(typeof(context.max)  !== "number" || typeof(context.min) !== "number" || isNaN(context.min) || isNaN(context.max) || Math.abs(context.max) === Infinity || Math.abs(context.min) === Infinity) {
        return {
            status: "failed",
            reason: "min and max must be a number"
        }
    }

    //Проверка на целое число
    if(!Number.isInteger(context.max) || !Number.isInteger(context.min)) {
        return {
            status: "failed",
            reason: "Arguments must be a integer number"
        }
    }

    //Проверка на позитивное число
    if(context.min < 0 || context.max < 0) {
        return {
            status: "failed",
            reason: "max and min must be a positive numbers"
        }
    }

    //Проверка на длину полей объекта
    if(String(context.max).length > 6 || String(context.max).length > 6) {
        return {
            status: "failed",
            reason: "Number length cannot be more than 6 characters"
        }
    }

    //Проверка больше ли min чем max
    if(context.max < context.min) {
        return {
            status: "failed",
            reason: "Value of max can`t be less than value of min"
        }
    }

    return 1
}

exports.findLuckyTicket = function (context) {
    if(findLuckyTicketErrors(context) !== 1) {
        return findLuckyTicketErrors(context);
    }

    let qunatityOfTicket = context.max - context.min;
    let ticketArr = [];

    for(let i=context.min, j = 0; i <= qunatityOfTicket, j <= qunatityOfTicket; i++, j++) {
        ticketArr[j] = String(i).split("");
        if(ticketArr[j].length < 6) {
            while(ticketArr[j].length < 6) {
                ticketArr[j].unshift("0");
            }
        }
    }

    if(simpleMethod(ticketArr) > hardMethod(ticketArr)) {
        return {
            winner: "Simple method",
            simple_method: simpleMethod(ticketArr),
            hard_method: hardMethod(ticketArr),
        }
    }

    else if(simpleMethod(ticketArr) === hardMethod(ticketArr)) {
        return {
            winner: "Draw",
            simple_method: simpleMethod(ticketArr),
            hard_method: hardMethod(ticketArr),
        }
    }

    else {
        return {
            winner: "Hard method",
            simple_method: simpleMethod(ticketArr),
            hard_method: hardMethod(ticketArr),
        }
    }
}



