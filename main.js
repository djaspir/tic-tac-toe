//player factory function
// const Player = (() => {})
// function Player(symbol, isTurn) {
//   return {
//     symbol,
//     isTurn,
//   };
// }

// const gameController = () => {
//   const player1 = new Player("X", true);
//   const player2 = new Player("O", false);

//   console.log(player1);
// };

// Player Factory Function
// const Player = (mark, isTurn) => {
//   return {
//     mark,
//     isTurn,
//   };
// };
// GameBoard Object with gameboard as an array
const gameBoard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const getBoard = (index) => {
    return gameBoard[index];
  };

  const setBoard = (mark, index) => {
    return (gameBoard[index] = mark);
  };

  return {
    getBoard,
    setBoard,
  };
})();

const displayController = (() => {
  let isTurn = true;

  // Cache DOM
  const cell = document.querySelectorAll(".cell");
  const gameText = document.getElementById("gameText");

  const render = () => {
    // Board
    for (let i = 0; i < cell.length; i++) {
      cell[i].textContent = gameBoard.getBoard(i);
    }
  };

  // render

  const addMark = (mark, index) => {
    gameBoard.setBoard(mark, index);
  };

  const switchTurn = () => (isTurn = !isTurn);

  const handleClick = (e) => {
    const index = e.target.dataset.id;
    const mark = isTurn ? "X" : "O";

    // Place Mark
    addMark(mark, index);
    switchTurn();
    render();

    // Check for win
    // Check for draw
    // Switch Turns
  };

  // Bind Events
  cell.forEach((item) => {
    item.addEventListener("click", handleClick, { once: true });
  });
})();

// Players are also going to be stored in objects

// Also an object to control the flow of the game itself

// MAIN GOAL: is to have as little global code as possible

// Players = factory

// gamebBoard, displayController = module
