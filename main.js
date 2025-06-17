function createPlayer(name) {
  let score = 0
  const getScore = () => score
  const increaseScore = () => score++

  let numberOfShips = 5
  const getNumberOfShips = () => numberOfShips
  const destroyShip = () => numberOfShips--

  return {name, getNumberOfShips, getScore, increaseScore, destroyShip}
}


function hitShipColor(element) {
 element.textContent = "X"
 element.style.border = "2px solid red"
 element.style.color = "red"
}

function hitWaterColor(element) {
 element.textContent = "O"
 element.style.border = "2px solid blue"
 element.style.color = "blue"
}

function createCells(){
  const containerGrid1 = document.querySelector(".game-grid-1")
  const containerGrid2 = document.querySelector(".game-grid-2")
  for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++){
      let gridCell1 = document.createElement("div")
      //let gridCell2 = document.createElement("div")
      gridCell1.className = `grid-cell-${i}-${j}-1`
      //gridCell2.className = `grid-cell-${i}-${j}-2`
      gridCell1.style.border = "2px solid black"
      containerGrid1.appendChild(gridCell1)
     // containerGrid2.appendChild(gridCell2)
    }
  }
}

function createGrid() {
  let grid  = []
  for(let i = 0; i < 10; i++){
    grid[i] = []
    for(let j = 0; j < 10; j++){
      grid[i][j] = null
    }
  }
  return grid
}

function hitShip(gameGrid) {    
  const cells = document.querySelectorAll(`[class^="grid-cell-"]`)
  cells.forEach(cell => {
    cell.addEventListener("click", () => {

      const match = cell.className.match(/grid-cell-(\d+)-(\d+)/)

      const i = parseInt(match[1])
      const j = parseInt(match[2])

      if (gameGrid[i][j] != null){
        hitShipColor(cell)
      } else {
        hitWaterColor(cell)
      }

    })
  })
}

function playGame() {
  const player1 = createPlayer("luca")
  const player2 = createPlayer("fabio")

  const player1Grid = createGrid()
  createCells()
  fillWaterWithShips(player1Grid)
  hitShip(player1Grid)
}

function createShip(type){
  const validTypes = ["aircraftCarrier", "battleShip", "submarine", "cruiser", "destroyer"]

  if(!validTypes.includes(type)) {
    throw new Error ("tipo di nave non valido");
  }

  return {type}
}

function fillWaterWithShips(grid) {
  let i = 0
  let j = 0
  const battleShipHor = [[i, j], [i, j + 1],[i, j + 2],[i, j + 3]]
  const battleShipVert = [grid[i][j], grid[i+1][j],grid[i+2][j],grid[i + 3][j]]

  battleShipHor.forEach(([x, y]) => {grid[x][y] = "ship"})
}

playGame()


