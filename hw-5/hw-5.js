// task-1
function countIpAdr(ip1, ip2) {
    let tmpFirstIp = ip1.split('.');
    let tmpSecondIp = ip2.split(".") ;
    let res = tmpFirstIp.reduce(function(acc, el, index) {
      console.log(acc << 8, "+", tmpSecondIp[index], "-", el)  
      return (acc << 8) + Number(tmpSecondIp[index]) - Number(el)
    }, 0);
    return res
}

// console.log(countIpAdr("20.0.0.10", "20.0.1.0"))