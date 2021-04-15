function oddString(str) {
    let tmpArr = [];
    for (let i = 1; i <= str.length/2; i++) {
        tmpArr.push((str[i-1] - str[str.length-i]) * (str[i-1] - str[str.length-i]));
    }
    for(let element of tmpArr) {
        if(!element == 0) {
            return false;
        }
    }

    return true
}

function notOddString(str) {
    if(str.split("").reverse().join("") == str) {
        return true;
    }
    else {
        return false;
    }
}

function findPolindromErrors(num) {

    // Проверка на существование аргумента
    if(typeof(num) === "undefined") {
        return  {
            status: "failed",
            reason: "Arguments are empty"
        }
    }

    // Проверка число или строка аргумент
    if(typeof(num) !== "number" && typeof(num) !== "string"  ||  isNaN(num) || Math.abs(num) === Infinity) {
        return  {
            status: "failed",
            reason: "Argument not a number or a string"
        }
    }

    // Проверка не меньше ли число чем 10
    if(Math.abs(num) <= 10) {
        return  {
            status: "failed",
            reason: "Argument can`t be equal or less than 10"
        }
    }

    // Проверка числа на максимальную длину число
    if(typeof(num) === "number" && String(num).length > 16) {
        return  {
            status: "failed",
            reason: "An argument of type number cannot be longer than 16"
        }
    }

    // Проверка числа на максимальную длину строка
    if(typeof(num) === "string" && String(num).length > 20) {
        return  {
            status: "failed",
            reason: "An argument of type number cannot be longer than 20"
        }
    }

    return 1
}

exports.findPolindrom = function (num) {

    if(findPolindromErrors(num) !== 1) {
        return findPolindromErrors(num)
    }

    else {
        let str = String(num);
        let palindrome = [];
        for(let i = 0; i < str.length; i++) {
            for(let j = str.length; j >= 0; j--) {
                if(str.slice(i,j).length % 2 === 0){
                    if(Number(str.slice(i,j)) > 10 && oddString(str.slice(i,j))) {
                        palindrome.push(Number(str.slice(i,j)));
                    }
                }
                else {
                    if(Number(str.slice(i,j)) > 10 && notOddString(str.slice(i,j))) {
                        palindrome.push(Number(str.slice(i,j)));
                    }
                }
            }
        }

        if(palindrome.length > 1) {
            let max = String(palindrome[0]).length;
            return palindrome.reduce((acc, el, index, arr) => {
                if(String(el).length > max) {
                    max = String(el).length;
                    acc = el;
                }
                return acc;
            })
        }

        return palindrome.length === 0 ? 0 : palindrome[0];
    }
}
