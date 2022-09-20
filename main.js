const gameBoard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let turn = 1;
  let isEnded = false;

  // Cache DOM
  const cell = document.querySelectorAll(".cell");
  const gameText = document.getElementById("gameText");

  // Bind Events
  cell.forEach((item) => {
    item.addEventListener("click", addMark);
  });

  render(getMark());

  function addMark(e) {
    if (isEnded) return;
    const index = e.target.dataset.id;

    if (cell[index].textContent !== "") return;
    gameBoard[index] = getMark();

    if (checkWin()) {
      isEnded = true;
      render(getMark());
      return (gameText.textContent = `Player ${getMark()} Win.`);
    }

    render(getMark());
    turn++;
  }

  function getMark() {
    return turn % 2 !== 0 ? "X" : "O";
  }

  function checkWin() {
    return winCombinations.some((combination) => {
      return combination.every((index) => {
        return gameBoard[index] === getMark();
      });
    });
  }

  function render(mark) {
    gameText.textContent = `Player ${mark}'s Turn`;

    for (let i = 0; i < gameBoard.length; i++) {
      cell[i].textContent = gameBoard[i];
    }
  }
})();
