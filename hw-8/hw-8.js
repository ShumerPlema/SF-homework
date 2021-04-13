function countdown(ms) {

    let res = [];
    let tmp = [];

    const hr = ms / 3600000;
    const min = ms % 3600000 / 60000;
    const sec = ms % 3600000  % 60000 / 1000;

    tmp.push(parseInt(hr), parseInt(min), parseInt(sec))

    res = tmp.map((el,index,arr) => {

        if(ms < 0) {
            el = el * -1
        }

        if(el.toString().length < 2) {
            el = "0" + el;
        }

        return el;
    })

    if(ms < 0) {
        res[0] = "-" + res[0];
    }

    else {
        res[0] = "+" + res[0];
    }

    return res.join(":")
}


console.log(countdown(-61000))