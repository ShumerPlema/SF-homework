function drawChessDeskErrors(h,w,el) {
    // Проверка на наличие аргументов
    if(typeof(el) === "undefined" || typeof(h) === "undefined" || typeof(w) === "undefined") {
        return {
            status: "failed",
            reason: "Not enough arguments"
        }
    }

    //Проверка на колв-во аргументов
    if(arguments.length === 0 || arguments.length > 3 || arguments.length < 3) {
        return {
            status: "failed",
            reason: "Incorrect number of arguments"
        }
    }

    //Проверка на тип данных высоты и ширины
    if(typeof(h) !== "number" || typeof(w) !== "number") {
        return {
            status: "failed",
            reason: "Height and width must be a number"
        }
    }

    // Проверка на NaN
    if(isNaN(h) || isNaN(w)) {
        return {
            status: "failed",
            reason: "Arguments cant be a NaN"
        }
    }

    // Проверка на Infinity
    if(Math.abs(h) === Infinity || Math.abs(w) === Infinity) {
        return {
            status: "failed",
            reason: "Arguments cant be a Infinity"
        }
    }

    // Проверка высоты и ширины на целое число
    if(!Number.isInteger(h) || !Number.isInteger(w)) {
        return {
            status: "failed",
            reason: "Height and width must b a integer number"
        }
    }

    // Проверка на равенство высоты и ширины
    if(h === w) {
        return {
            status: "failed",
            reason: "`Height cant be equal width"
        }
    }

    //Проверка 'el' на строку
    if(typeof(el) !== "string") {
        return {
            status: "failed",
            reason: "`el` must be a string"
        }
    }

    // Проверка `el` на длину
    if(el.length <= 0) {
        return {
            status: "failed",
            reason: "Length `el` must be more than 0"
        }
    }

    // Проверка на то что первый элемент не пустой
    if(el[0] === " ") {
        return {
            status: "failed",
            reason: "First element of  `el` can`t be ` `"
        }
    }

    // Проверка на минимальную длину и ширину
    if(h <= 1 || w <= 1) {
        return {
            status: "failed",
            reason: "Height and width can`t be less then 2"
        }
    }

    // Проверка на максимальную длину и ширину
    if(h > 256 || w > 256) {
        return {
            status: "failed",
            reason: "Height and width can`t be more then 256"
        }
    }

    return 1
}

exports.drawChessDesk = function (h,w,el) {

    if(drawChessDeskErrors(h,w,el) !== 1) {
        return drawChessDeskErrors(h,w,el)
    }

    let desk = ``
    for(let i=0; i<h; i++) {
        if(i!==0) {
            desk+=`\n`;
        }

        if(i % 2 === 0) {
            desk += ` `;
        }

        for(let j=0; j<w;j++){
            if(j % 2 === 0){
                desk+= `${el[0]}`;
            }
            if(j % 2 !== 0) {
                desk += ` `;
            }
        }
    }
    return desk;
}


