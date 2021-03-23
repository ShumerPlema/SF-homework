// pop

function myPop(arr = []) {
    if(arr.length == 0) {
        return undefined;
    }
    else {
        const deletedElem = arr[arr.length-1];
        arr = arr.join("")
        .substring(0,arr.length-1)
        .split("");

        return deletedElem;
    }
}

//push

function myPush(arr, elem="0") {
    if(elem === "0") {
        return arr.length;
    }
    else {
        arr[arr.length] = elem;
        return arr.length; 
    }
}

//shift

function myShift(arr = []) {
    if(arr.length === 0) {
        return undefined;
    }
    else {
        const deletedElem = arr[0];
        delete arr[0];

        for(let i=0; i<arr.length-1; i++) {
            arr[i] = arr[i+1];
        }
        
        return deletedElem;
    }
}

//unshift

function myUnshift(arr, elem = "0") {
    if(elem === "0") {
        return arr.length;
    }
    else {
        arr.reverse();
        myPush(arr,elem);
        arr.reverse();
        return arr.length; 
    }
}

//concat

function myConcat() {
    let res = [];

    for(let tmp of arguments) {
        if(typeof(tmp) == "object") {
            for(let element of tmp) {
                myPush(res, element);
            }
        }
        else {
            console.log(tmp)
            myPush(res, tmp);
        }
    }

    return res
}

// from map to reduce 
function mapToReduce () {
    const tmpArr = ["Яблоко","Банан","Ананас"] ;
    let res = tmpArr.reduce((acc,el,index) => {
        acc[index] = el[0];
        return acc;
    }, []);

    return res;
}

//from filter to reduce
function filterToReduce () {
    const tmpArr = ["Яблоко","Банан","Ананас"];
    let res = tmpArr.reduce((acc,el) => {
        if(el[0].toLowerCase() === "а") {
            acc[0] = el;
        }
        return acc;
    }, []);

    return res;
}

// from forEach to reduce

function forEachToReduce () {
    const tmpArr = ["Яблоко","Банан","Ананас"];
    let res = tmpArr.reduce((acc,el,index,arr) => {
        acc[index] = `${index + 1}: ${el};` 
        return acc;
    }, []);

    return res;
}