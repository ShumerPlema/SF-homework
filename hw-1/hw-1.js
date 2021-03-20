// TASK 1
function bitNum(number) {
    let tmp = (number).toString(2)
    let count = 0;
    for(let i in tmp) {
        if(tmp[i]==1) {
            count++
        } 
    }
    console.log(count)
}