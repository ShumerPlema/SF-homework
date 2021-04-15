const context = {
    min: 9,
    max: 456,
    len: 123,
}

function fibonacciNumbersErrors(context) {

    // Проверка на наличие аргументов
    if(typeof(context) === "undefined") {
        return {
            status: "failed",
            reason: "Argument are empty"
        }
    }

    // Проверка на то что context не пустой
    if(Object.keys(context).length === 0) {
        return {
            status: "failed",
            reason: "Object is empty"
        }
    }

    // Проверка на кол-во ключей
    if(Object.keys(context).length >= 4){
        return {
            status: "failed",
            reason: "Incorrect number of keys"
        }
    }

    //Проверка на навазние ключей
    if(Object.keys(context).length === 2) {
        if(Object.keys(context)[0] !== "min" || Object.keys(context)[1] !== "max") {
            return {
                status: "failed",
                reason: "Incorrect names of keys"
            }
        }
    }

    if(Object.keys(context).length === 3) {
        if(Object.keys(context)[0] !== "min" || Object.keys(context)[1] !== "max" || Object.keys(context)[2] !== "len") {
            return {
                status: "failed",
                reason: "Incorrect names of keys"
            }
        }
    }

    if(Object.keys(context).length === 1) {
        if(Object.keys(context)[0] !== "len") {
            return {
                status: "failed",
                reason: "Incorrect names of keys"
            }
        }
    }

    //Проверка на то что min max len числа
    for(let i = 0; i < Object.keys(context).length; i++) {
        if(typeof(Object.values(context)[i]) !== "number" || isNaN(Object.values(context)[i]) || Math.abs(Object.values(context)[i]) === Infinity) {
            return {
                status: "failed",
                reason: "Values of object must be a number"
            }
        }
    }

    //Проверка на то что min max len целые числа
    for(let i = 0; i < Object.keys(context).length; i++) {
        if(Object.values(context)[i] < 0) {
            return {
                status: "failed",
                reason: "Values of object must be a positive number"
            }
        }
    }

    //Проверка на позитивное число
    for(let i = 0; i < Object.keys(context).length; i++) {
        if(!Number.isInteger(Object.values(context)[i])) {
            return {
                status: "failed",
                reason: "Values of object must be a integer number"
            }
        }
    }

    //Проверка на то что min не больше чем max
    if(context.min >= context.max) {
        return {
            status: "failed",
            reason: "Value of min can`t be more than value of max"
        }
    }

    //Проверка на то что len min max не меньше нуля
    if(context.len === 0 || context.min === 0 || context.max === 0) {
        return {
            status: "failed",
            reason: "Value of len can`t be equal than 0"
        }
    }

    return 1
}


exports.fibonacciNumbers = function (context) {

    if(fibonacciNumbersErrors(context) !== 1){
        return fibonacciNumbersErrors(context);
    }

    let fibonacci = [1,1];
    let tmp1, tmp2;
    let index = 2;

    if(Object.keys(context).length === 3 || Object.keys(context).length === 2) {
        while(fibonacci[fibonacci.length - 1] < context.max) {
            tmp1 = fibonacci[index - 1];
            tmp2 = fibonacci[index - 2];
            fibonacci.push(tmp1 + tmp2);
            index++;
        }

        fibonacci.pop()

        return fibonacci.reduce((acc, el) => {
            if(el > context.min)  {
                acc.push(el);
            }

            return acc;
        }, [])
    }

    else {
        while(fibonacci.length < context.len) {
            tmp1 = fibonacci[index - 1];
            tmp2 = fibonacci[index - 2];
            fibonacci.push(tmp1 + tmp2);
            index++;
        }

        return fibonacci;
    }
}
