// TASK 1
// function bitNum(number) {
//     let tmp = (number).toString(2)
//     let count = 0;
//     for(let i in tmp) {
//         if(tmp[i]==1) {
//             count++
//         } 
//     }
//     console.log(count)
// }

// TASK 2 
function sortString(string) {
    if(string.length==0) {
        return ""
    }
    else {
        let result = []
        let arrString = string.split(" ")
        for ( let value of arrString ){
            for (let element of value){
                if(!isNaN(element)) {
                    // result.splice(element-1,0,value)
                    result[element-1]=value
                }
            }
        }
        console.log(result)
    }
}