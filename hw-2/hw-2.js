// concat()

function myConcat() {
   let res; 
   for(let tmp of arguments) {
       res+=tmp
   }
   return res
}

//lastIndexOf()

function myLastIndexOf(str, char, index) {
    let res = -1
    for(let i=0; i<=index; i++) {
        if(str[i] == char) {
            res = i
        }
    }
    return res
}

//includes()

function myIncludes(str,substr) {
    let reg = new RegExp(substr)
    if(reg.test(str)){
        return true
    }
    else {
        return false
    }
}

//repeat()

function myRepeat(str,count) {
    if(typeof(str)=="string"){
        if(count < 0) {
            console.log("Invalid count value")
            return "";
        }
        else {
            let res = "";
            for(let i=0; i<Math.floor(count); i++) {
                res+=str;
            }
            return res;
        }
    }
    else {
        console.log("Invalid or unexpected token")
        return "";
    }
}

// substr

function mySubstr(str, startPos, endPos = str.length) {
    let res = []
    for(let i=startPos; i<endPos; i++) {
        res[i] = str[i];
    }
    return res.join("");
}

//substring

function mySubstring(str, startPos, endPos = str.length) {
    let res = []
    for(let i=startPos; i<endPos; i++) {
        res[i] = str[i];
    }
    return res.join("");
}

