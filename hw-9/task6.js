function numericalSequenceErrors(len, square) {

    // Проверка на наличие аргументов
    if(typeof(len) === "undefined" || typeof(square) === "undefined") {
        return {
            status: "failed",
            reason: "Insufficient number of arguments"
        }
    }


    // Проверка на то числа ли аргументы или нет
    if(typeof(len) != 'number'|| typeof(square) != 'number' || isNaN(len) || isNaN(square) || Math.abs(len) === Infinity || Math.abs(square) === Infinity) {
        return {
            status: "failed",
            reason: "Length and square must be a number"
        }
    }

    // Проверка на то что аргументы не меньше нуля
    if (square <= 0 || len <= 0) {
        return {
            status: "failed",
            reason: "Arguments can`t be less then zero"
        }
    }

    //Проверка на то что длина целое число
    if(!Number.isInteger(len)) {
        return {
            status: "failed",
            reason: "Length must be a integer number"
        }
    }

    //Проверка на размер длины и квадрата
    if(len > 1000000 || square > 1000000) {
        return {
            status: "failed",
            reason: "Arguments exceeded the maximum value of 1,000,000"
        }
    }

    return 1
}

exports.numericalSequence =  function(len, square) {
    if(numericalSequenceErrors(len, square) !== 1) {
        return numericalSequenceErrors(len, square);
    }

    else {
        let row = [];
        let count = 0;

        while(row.length < len) {
            if(Math.pow(count, 2) > square) {
                row.push(count);
            }
            count ++;
        }
        return row.join(",");
    }
}

