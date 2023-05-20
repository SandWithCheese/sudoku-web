async function getBoard() {
    const data = await fetch("https://sudoku-api.vercel.app/api/dosuku")
    jsonData = await data.json()
    deleteInputs()
    insertArr(jsonData.newboard.grids[0].value)
    console.log(jsonData.newboard.grids[0].value)
}

// getBoard()

// console.log(getBoard())

function insertArr(arr){
    let baris = 0
    const inputs = document.querySelectorAll("input")
    for (let i = 0; i < 81; i++) {
        let kolom = i % 9

        if (arr[baris][kolom] !== 0){
            inputs[i].value = arr[baris][kolom]
            console.log(arr[baris][kolom])
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

// fetch("https://sudoku-api.vercel.app/api/dosuku")
// .then(res => res.json())
// .then(data => insertArr(data.newboard.grids[0].value))

// const inputs = Array.prototype.slice.call(document.querySelectorAll('.box-1 input'))
