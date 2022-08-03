function row1(board){
    for (var i = 0; i < 9; i++){
        var m = []
        for (var j = 0; j < 9; j++){
            if (m.includes(board[i][j])){
                return false
            }
            else if (board[i][j] != null){
                m.push(board[i][j])
            }
        }
    }
    return true
}
function col(board){
    for (var i = 0; i < 9; i++){
        var m = []
        for (var j = 0; j < 9; j++){
            if (m.includes(board[j][i])){
                return false
            }
            else if (board[j][i] != null){
                m.push(board[j][i])
            }
        }
    }
    return true
}
function box(board){
    const Coord = [[0, 0], [0, 1], [0, 2],
                  [1, 0], [1, 1], [1, 2],
                  [2, 0], [2, 1], [2, 2]]
    for (var y = 0; y < 9; y += 3){
        for (var x = 0; x < 9; x += 3){
            var m = []
            for (var i = 0; i < 9; i++){
                var coords = [...Coord[i]]
                coords[0] += y
                coords[1] += x
                if (m.includes(board[coords[0]][coords[1]])){
                    return false
                }
                else if (board[coords[0]][coords[1]] != null){
                    m.push(board[coords[0]][coords[1]])
                }
            }
        }
    }
    return true
}
function valid(board){
    return row1(board) && col(board) && box(board)
}
function start() {
    var iboard = [[]]
    var j = 0
    for (var i = 1; i <= 81; i++){
        const val = document.getElementById((i)).value
        if (val == ""){
            iboard[j].push(null)
        }
        else { 
            iboard[j].push(Number(val))
        }
        if (i % 9 == 0 && i < 81){
            iboard.push([])
            j++
        }
    }
    const inputValid = valid(iboard)
    if (!inputValid){
        inputIsInvalid()
    }
    else{
        const answer = solve(iboard)
        updateBoard(answer, inputValid)
    }
}
function inputIsInvalid(){
    return  alert(" invalid entry")
    }
function solve(board) {
    if (solved(board)) {
        return board
    }
    else {
        const next= nextBoards(board)
        const validbox = validity(next)
        return Sol(validbox)
    }
}
function Sol(boards){
    if (boards.length < 1){
        return false
    }
    else {
         var first = boards.shift()
        const tryPath = solve(first)
        if (tryPath != false){
            return tryPath
        }
        else{
            return Sol(boards)
        }
    }
}
function solved(board){
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null){
                return false
            }
        }
    }
    return true
}
function nextBoards(board){ 
    var res = []
    const firstEmpty = findEmptySquare(board)
    if (firstEmpty != undefined){
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        for (var i = 1; i <= 9; i++){
            var newBoard = [...board]
            var row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res
}
function findEmptySquare(board){
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null) {
                return [i, j]
            }
        }
    }
}
function validity(boards){
    var res = []
    for (var i = 0; i < boards.length; i++){
        if (valid(boards[i])){
            res.push(boards[i])
        }
    }
    return res
}
function updateBoard(board) {
    if (board == false){
        return alert(" not enough input")
    }
    else{
        for (var i = 1; i <= 9; i++){
            var row = ""
            for (var j = 0; j < 9; j++){
                if (row == ""){
                    row = row + String(board[i - 1][j])
                }
                else {
                    row = row + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + String(board[i - 1][j])
                }
            }
            document.getElementById("row " + String(i)).innerHTML = row
        }
    }
}


