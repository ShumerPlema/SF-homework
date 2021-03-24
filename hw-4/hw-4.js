// task 1 

function guestSort(guestList) {
    let guests = guestList.
    toUpperCase().
    split(";").
    map((el) => {
        return el.split(":").reverse().join(":")
    })
    .sort()
    .map((el) => {
        let res = `(${el.split(":")[0]}, ${el.split(":")[1]})`
        return res;
    }).
    join(" ");

    return guests
}

guestSort("Fred:Corwill;Wilfred:Corwill;Barney:Tornbull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill");