function createPlayer(symbol) {
  this.symbol = symbol;

  const getSymbol = () => symbol;

  return { getSymbol };
}

const gameBoard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const getBoard = (index) => {
    return gameBoard[index];
  };

  const setBoard = (index, mark) => {
    return (gameBoard[index] = mark);
  };

  const resetBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = "";
    }
  };

  return {
    getBoard,
    setBoard,
    resetBoard,
  };
})();

const displayController = (() => {
  // gameBoard module
  const getBoard = gameBoard.getBoard;

  // Cache DOM
  const cell = document.querySelectorAll(".cell");
  const resetBtn = document.getElementById("resetBtn");
  const gameText = document.getElementById("gameText");

  // Bind Events
  cell.forEach((item) => {
    item.addEventListener("click", addMark);
  });
  resetBtn.addEventListener("click", reset);

  // Render
  function render() {
    for (let i = 0; i < cell.length; i++) {
      cell[i].textContent = getBoard(i);
    }
  }

  function addMark(e) {
    if (gameController.getIsOver() || e.target.textContent !== "") return;
    gameController.playRound(parseInt(e.target.dataset.id));
    console.log("yes");
    render();
  }

  function setResultMessage(status) {
    if (status === "Draw") {
      setMessageElement("It's a draw!");
    } else {
      setMessageElement(`Player ${status} Win!`);
    }
  }

  function setMessageElement(msg) {
    gameText.textContent = msg;
  }

  function reset() {
    for (let i = 0; i < cell.length; i++) {
      gameBoard.resetBoard();
      gameController.reset();
      render();
      setMessageElement("Player X's Turn");
    }
  }
  return { setResultMessage, setMessageElement };
})();

const gameController = (() => {
  // Gameboard Module
  const setBoard = gameBoard.setBoard;

  // Display Controller module
  const setResultMessage = displayController.setResultMessage;
  const setMessageElement = displayController.setMessageElement;

  // Initialize Player
  const player1 = createPlayer("X");
  const player2 = createPlayer("O");

  // Round
  let round = 1;
  let isOver = false;

  function playRound(index) {
    setBoard(index, getCurrentMark());

    if (checkWinner(index)) {
      setResultMessage(getCurrentMark());
      isOver = true;
      return;
    } else if (round === 9) {
      setResultMessage("Draw");
      isOver = true;
      return;
    }
    round++;
    setMessageElement(`Player ${getCurrentMark()}'s Turn`);
  }

  function getCurrentMark() {
    return round % 2 === 1 ? player1.getSymbol() : player2.getSymbol();
  }

  function checkWinner(fieldIndex) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((combination) => combination.includes(fieldIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getBoard(index) === getCurrentMark()
        )
      );
  }

  function getIsOver() {
    return isOver;
  }

  function reset() {
    round = 1;
    isOver = false;
  }

  return { playRound, getIsOver, reset };
})();
