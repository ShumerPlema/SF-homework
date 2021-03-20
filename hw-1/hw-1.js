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
// function sortString(string) {
//     if(string.length==0) {
//         return ""
//     }
//     else {
//         let result = []
//         let arrString = string.split(" ")
//         for ( let value of arrString ){
//             for (let element of value){
//                 if(!isNaN(element)) {
//                     // result.splice(element-1,0,value)
//                     result[element-1]=value
//                 }
//             }
//         }
//         console.log(result.join(" "))
//     }
// }

// sortString("4of Fo1r pe6ople g3ood th5e the2")

// TASK 3


function TeamConstructor() {
    this.player1 = {
        cards: {
            yellowCard: "0",
            redCard: "0"
        }
    }

    this.player2 = {
        cards: {
            yellowCard: "0",
            redCard: "0"
        }
    }

    this.player3 = {
        cards: {
            yellowCard: "0",
            redCard: "0"
        }
    }

    this.player4 = {
        cards: {
            yellowCard: "0",
            redCard: "0"
        }
    }

    this.player5 = {
        cards: {
            yellowCard: "0",
            redCard: "0"
        }
    }

    this.player6 = {
        cards: {
            yellowCard: "0",
            redCard: "0"
        }
    }

    this.player7 = {
        cards: {
            yellowCard: "0",
            redCard: "0"
        }
    }

    this.player8 = {
        cards: {
            yellowCard: "0",
            redCard: "0"
        }
    }

    this.player9 = {
        cards: {
            yellowCard: "0",
            redCard: "0"
        }
    }

    this.player10 = {
        cards: {
            yellowCard: "0",
            redCard: "0"
        }
    }

    this.player11 = {
        cards: {
            yellowCard: "0",
            redCard: "0"
        }
    }

    this.deletePlayer = function(select_player) {
        delete this[select_player]
    }
    
    this.addRedCard = function(select_player) {
        if(this[select_player]?.cards.redCard == undefined){}

        else {
            this[select_player].cards.redCard=1
        }
        
        // console.log(this[select_player].cards.redCard)
    }

    this.addYellowCard = function(select_player) {
        this[select_player].cards.yellowCard++
    }
}

function setPlayerNumber(arrEvent) {
    if(arrEvent.length==4) {
        return player_number = arrEvent.slice(1,3)
    }

    else {
        return player_number = arrEvent[1];
    }
}

const teamA = new TeamConstructor()
const teamB = new TeamConstructor()

function menStillStanding(teamA, teamB, event) {
    let player_number
    let select_player

    for(let tmp of event) {
        if(tmp[0] == "A" ) {
            player_number = setPlayerNumber(tmp)
            select_player = `player${player_number}`
            if(tmp[tmp.length-1]=="R") {
                teamA.addRedCard(select_player)
                teamA.deletePlayer(select_player)
                // console.log("Team A",teamA)
            }
            else {
                if(this[select_player]?.cards.redCard == undefined){}
                else {
                    teamA.addYellowCard(select_player)
                    if(teamA[select_player].cards.yellowCard==2) {
                        teamA.deletePlayer(select_player)
                    }
                }
            }
        }

        else {
            player_number = setPlayerNumber(tmp)
            select_player = `player${player_number}`
            if(tmp[tmp.length-1]=="R") {
                teamB.addRedCard(select_player)
                teamB.deletePlayer(select_player)
                
            }
            else {
                if(this[select_player]?.cards.redCard == undefined){}
                else {
                    teamA.addYellowCard(select_player)
                    if(teamA[select_player].cards.yellowCard==2) {
                        teamA.deletePlayer(select_player)
                    }
                }
            }
        }
    }

    if(Object.keys(teamA).length < 7 || Object.keys(teamB).length < 7) {
        return [Object.keys(teamA).length-3,Object.keys(teamB).length-3]
    }
    else {
        return [Object.keys(teamA).length-3, Object.keys(teamB).length-3]
    }
}

let result = menStillStanding(teamA,teamB,["B10Y","B10Y", "B10R"])
console.log(result)