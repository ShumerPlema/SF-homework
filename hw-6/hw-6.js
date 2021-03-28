function game(desk) {
    for(let i = 0; i < desk.length; i++) {
        if(desk[i][0] == desk[i][1] && desk[i][1] == desk[i][2]) {
            if(desk[i][0] != 0) {
                return desk[i][0] == 1 ? 1 : 2;
            }
        }

        if(desk[0][i] == desk[1][i] &&  desk[1][i] == desk[2][i]) {
            if(desk[0][i] != 0) {
                return desk[i][0] == 1 ? 1 : 2;
            }
        }
    }

    if(desk[0][2] == desk[1][1] && desk[1][1] == desk[2][0]) {
        if(desk[0][2] != 0) {
            return desk[0][2] == 1 ? 1 : 2;
        }
    }

    if(desk[0][0] == desk[1][1] && desk[1][1] == desk[2][2]) {
        if(desk[0][0] != 0) {
            return desk[0][0] == 1 ? 1 : 2;
        }
    }

    for(let i = 0; i < desk.length; i++) {
        for(let j = 0; j < desk.length; j++) {
            if(desk[i][j] == 0) {
                return -1;
            }
        }
    }

    return 0
}

game([[0, 0, 1],[0, 1, 2],[2, 1, 0]])
