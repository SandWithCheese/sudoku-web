async function getBoard() {
    const data = await fetch("https://sugoku.onrender.com/board?difficulty=random")
    jsonData = await data.json()
    console.log(jsonData.board)
    deleteInputs()
    insertArr(jsonData.board)
}


function insertArr(arr){
    let baris = 0
    const inputs = document.querySelectorAll("input")
    for (let i = 0; i < 81; i++) {
        let kolom = i % 9

        if (arr[baris][kolom] !== 0){
            inputs[i].value = arr[baris][kolom]
        }

        if (kolom === 8){
            baris += 1
        }
    }
}


function deleteInputs(){
    const inputs = document.querySelectorAll("input")
    inputs.forEach(input => {
        input.value = ""
    })
}


function getBoardArr(){
    let board = []
    let kolom = []
    const inputs = document.querySelectorAll("input")
    inputs.forEach((input, index) => {
        if (index % 9 === 0 && index !== 0) {
            board.push(kolom)
            kolom = []
        }

        if (input.value === ""){
            kolom.push(0)
        }
        else{
            kolom.push(Number(input.value))
        }
    })
    board.push(kolom)
    
    return board
}


function valid(board, num, pos){
    for (let i = 0; i < 9; i++){
        if (board[pos[0]][i] === num && pos[1] !== i){
            return false
        }
    }

    for (let j = 0; j < 9; j++){
        if (board[j][pos[1]] === num && pos[0] !== j){
            return false
        }
    }

    const box_x = Math.floor(pos[1]/3)
    const box_y = Math.floor(pos[0]/3)

    for (let i = box_y * 3; i < box_y * 3 + 3; i++){
        for(let j = box_x * 3; j < box_x * 3 + 3; j++){
            if (board[i][j] === num && pos[0] !== i && pos[1] !== j){
                return false
            }
        }
    }

    return true
}


function find_empty(board){
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++){
            if (board[i][j] === 0){
                return [i, j]
            }
        }
    }

    return false
}


function solveBoard(){
    let board = getBoardArr()
    function solve(board){
        let find = find_empty(board)
        let baris, kolom;
    
        if (find === false){
            return true
        }
        else{
            [baris, kolom] = find
        }
    
        for (let i = 1; i <= 9; i ++){
            if (valid(board, i, [baris, kolom])){
                const inputs = document.querySelectorAll("input")
                board[baris][kolom] = i
                inputs[baris*9 + kolom].value = i
    
                if (solve(board)){
                    return true
                }
                
                board[baris][kolom] = 0
                inputs[baris*9 + kolom].value = ""
            }
        }
    
        return false
    
    }

    solve(board)
}


function check(){
    let board = getBoardArr()

    if (!find_empty(board)){
        for (let i = 0; i < 9; i ++){
            for (let j = 0; j < 9; j ++){
                if (!valid(board, board[i][j], [i, j])){
                    console.log(i, j)
                    alert("It's not a valid solution")
                    return NaN
                }
            }
        }

        alert("Hurray! You found the solution")
    }
    else{
        alert("The game hasn't finished")
    }
}

