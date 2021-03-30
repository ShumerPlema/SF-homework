function anim1() {
    const elems = ["\u2192","\u2193","\u2190","\u2191"];
    let index = 0;

    setInterval(() => {

        if(index >= elems.length) {
            index = 0;
        }
        console.clear()
        console.log(elems[index])
        index++; 
    }, 300);
}

function anim2() {
    const elems = ["\u2739", "\u2738", "\u2737", "\u2736",   "\u2605"];
    let index = 0;

    setInterval(() => {

        if(index >= elems.length) {
            index = 0;
        }
        console.clear()
        console.log(elems[index])
        index++; 
    }, 300);
}


function anim3() {
    const elems = ["—", "\\", "|", "/", "—"];
    let index = 0;

    setInterval(() => {

        if(index >= elems.length) {
            index = 0;
        }
        console.clear()
        console.log(elems[index])
        index++; 
    }, 300);
}

function anim4() {
    
    let elems = ["\u2588", "\u2589", "\u258A", "\u258B", "\u258C"]
    let index = 0;
    setInterval(() => {
        if(index >= elems.length) {
            if(index <= elems.length) {
                index --
            }
            index = 0;
        }
        console.clear()
        console.log(elems[index])
        index++; 
    }, 300);
}

function anim5() {
    const elems = ["\u25BB", "\u25BB", "\u25BB","\u25BB","\u25BB", ];
    let index = 0;

    setInterval(() => {

        if(index >= elems.length) {
            index = 0;
        }
        console.clear()
        elems[index] = "\u25BA"
        console.log(elems.join(""))
        elems[index] = "\u25BB";
        index++; 
    }, 300);
}

function anim6() {
    
    let elems = ["\u25D4", "\u25D1", "\u25D5", "\u25CF"]
    let index = 0;
    setInterval(() => {
        if(index >= elems.length) {
            index = 0;
        }
        console.clear()
        console.log(elems[index])
        index++; 
    }, 300);
}

function anim7() {
    
    let elems = ["\u25E7", "\u25E9", "\u25E8", "\u25EA"]
    let index = 0;
    setInterval(() => {
        if(index >= elems.length) {
            if(index <= elems.length) {
                index --
            }
            index = 0;
        }
        console.clear()
        console.log(elems[index])
        index++; 
    }, 300);
}

function anim8() {
    
    let elems = [".", "o", "O", "0", "\u2739"]
    let index = 0;
    setInterval(() => {
        if(index >= elems.length) {
            index = 0;
        }
        console.clear()
        console.log(elems[index])
        index++; 
    }, 300);
}

function anim9() {
    
    let elems = ["\u25F0", "\u25F3", "\u25F2", "\u25F1"]
    let index = 0;
    setInterval(() => {
        if(index >= elems.length) {
            index = 0;
        }
        console.clear()
        console.log(elems[index])
        index++; 
    }, 300);
}


function anim10() {
    
    let elems = ["\u25E4", "\u25E5", "\u25E2", "\u25E3"]
    let index = 0;
    setInterval(() => {
        if(index >= elems.length) {
            index = 0;
        }
        console.clear()
        console.log(elems[index])
        index++; 
    }, 300);
}