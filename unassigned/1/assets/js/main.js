const EMPTY = -1;
const NON_PLAYER = -1;

class Scoreboard {
  constructor(gameBoard, players, timeLimit = 0) {
    const aside = document.querySelector("aside");

    this.scores = [];
    this.players = [];
    this.scores.length = players;
    this.scores = this.scores.fill(0);
    this.paused = true;
    for (let player = 0; player < players; ++player)
      this.players.push(`Player ${player + 1}`);
    this.setTimeLimit(timeLimit);
    setInterval(() => this.decrementTime(), 1000);
    this.gameBoard = gameBoard;
    clearHTML(aside);
    this.element = aside.appendChild(document.createElement("div"));
    this.element.classList.add("container", "scoreboard");
    this.element.appendChild(document.createElement("div")).classList.add("player-card");
    this.element.appendChild(document.createElement("div")).classList.add("turn-card");
  }

  updateScore() {

  }

  updateCurrentPlayer() {
    // create a slot and update background img based upon it ?
  }

  incrementScore(player = this.gameBoard.currentPlayer) {
    return ++this.scores[player];
  }

  togglePause() {
    return this.paused = !this.paused;
  }

  setTimeLimit(time) {
    this.timeLimit = time;
    this.resetTime();
    return this.timeLimit;
  }

  resetTime() {
    return this.currentTime = this.timeLimit;
  }

  decrementTime() {
    if (!this.paused && this.timeLimit > 0) {
      --this.currentTime;
      if (this.currentTime < 0) {
        this.gameBoard.incrementPlayer("current");
        this.resetTime();
      }
    }
    return this.currentTime;
  }
}

class GameBoard {
  constructor(gridX = 7, gridY = 6, piecesToWin = 4, players = 2) {
    const main = document.querySelector("main");

    this.scoreboard = new Scoreboard(this, players);
    this.players = players;
    this.resetCurrentPlayer();
    this.piecesToWin = piecesToWin;
    this.pieces = [
      "fox-piece",
      "falco-piece",
      "slippy-piece",
      "krystal-piece",
      "andross-piece",
      "peppy-piece"
    ];
    main.innerHTML = "";
    this.element = main.appendChild(document.createElement("div"));
    this.element.classList.add("container", "game-board");
    this.element.addEventListener("click", e => this.onClick(e));
    this.initializeGrid(gridX, gridY);
  }

  initializeGrid(gridX, gridY) {
    let currentElement = this.element;

    clearHTML(currentElement);
    this.resetCurrentPlayer();
    this.grid = [];
    this.gridX = gridX;
    this.gridY = gridY;
    // currentElement.setAttribute("style", `width: ${ 100 * gridY / gridX }%`);
    for (let y = 0; y < gridY; ++y) {
      this.grid.push([]);
      for (let x = 0; x < gridX; ++x) {
        currentElement = document.createElement("div");
        this.grid[y].push(currentElement);
        currentElement.classList.add("container", "cell");
        currentElement.setAttribute("style",
          `flex-basis: ${100 / gridX}%;`
          + `height: ${100 / gridY}%;`
        );
        currentElement.setAttribute("data-col", x);
        currentElement.setAttribute("data-row", y);
        currentElement = currentElement.appendChild(document.createElement("div"));
        currentElement.classList.add("slot", "empty");
        currentElement.setAttribute("value", EMPTY);
      }
    }

    // ensure grid builds with row number descending
    for (let y = gridY - 1; y >= 0; --y)
      for (let x = 0; x < gridX; ++x)
        this.element.appendChild(this.grid[y][x]);
  }

  // misc handlers

  createScoreBoard(players, timeLimit) {
    this.scoreboard = new Scoreboard(players, timeLimit);
  }

  resetCurrentPlayer() {
    this.currentPlayer = 0;
  }

  incrementPlayer(player) {
    switch (player) {
      case "current":
        this.currentPlayer = (this.currentPlayer + 1) % this.players;
        return this.currentPlayer;
      default:
        return null;
    }
  }

  win() {
    // open modal with reset (this.initializeGrid(this.gridX, this.gridY))
    if(this.currentPlayer === NON_PLAYER)
      console.log("Game over.")
    else console.log(`Player ${this.currentPlayer + 1} wins`);
  }

  // element handlers
  onClick(e) {
    let target = e.target;
    if (target.classList.contains("slot"))
      target = target.parentElement;
    if (target.classList.contains("cell"))
      if (this.pushToSlot(target, this.currentPlayer))
        this.incrementPlayer("current");
  }

  checkStalemate() {
    let x = 0;
    while (this.isValidAt(x, this.gridY - 1)) {
      if (this.getSlotValueAt(x, this.gridY - 1) === EMPTY)
        return false;
      ++x;
    }
    return true;
  }

  checkWin(target) {
    return this.checkWinAt(this.getCellX(target), this.getCellY(target));
  }

  pushToSlot(target, value) {
    return this.pushToSlotAt(this.getCellX(target), value);
  }

  setSlot(target, value, force = false) {
    return this.setSlotAt(this.getCellX(target), this.getCellY(target), value, force);
  }

  updateSlot(slot) {
    return slot.classList.replace(slot.classList.item(1), this.pieces[Number(slot.getAttribute("value"))]);
  }

  getCellY(cell) {
    return Number(cell.getAttribute("data-row"));
  }

  getCellX(cell) {
    return Number(cell.getAttribute("data-col"));
  }

  // grid handlers
  refreshSlots() {
    for (let y = 0; y < this.gridY; ++y)
      for (let x = 0; x < this.gridX; ++x)
        this.updateSlot(this.getSlotAt(x, y));
  }

  pushToSlotAt(x, value) {
    let y = 0;
    while (this.isValidAt(x, y)) {
      if (this.setSlotAt(x, y, value)) {
        if (this.checkWinAt(x, y))
          this.win();
        return true;
      }
      ++y;
    }
    return false;
  }

  checkWinAt(x, y) {
    if (this.checkStalemate()) {
      this.currentPlayer = NON_PLAYER;
      return true;
    }
    return this.checkAdjacent(x, y);
  }

  checkAdjacent(x, y) {
    let count = 1;
    let highestCount = 1;
    function compareAndReset() {
      if (count > highestCount)
        highestCount = count;
      count = 1;
    }
    // negative slant
    count += this.checkDirectionAt(x, y, -1, 1);  // left up
    count += this.checkDirectionAt(x, y, 1, -1);  // right down
    compareAndReset();
    // horizontal
    count += this.checkDirectionAt(x, y, 1, 1);   // right up
    count += this.checkDirectionAt(x, y, -1, -1); // left down
    compareAndReset();
    // positive slant
    count += this.checkDirectionAt(x, y, 0, 1);   // up
    count += this.checkDirectionAt(x, y, 0, -1);  // down
    compareAndReset();
    // vertical
    count += this.checkDirectionAt(x, y, -1, 0);  // left
    count += this.checkDirectionAt(x, y, 1, 0);   // right
    compareAndReset();
    return highestCount >= this.piecesToWin;
  }

  isValidAt(x, y) {
    return x >= 0 && x < this.gridX &&
      y >= 0 && y < this.gridY;
  }

  checkDirectionAt(x1, y1, xDir, yDir) {
    const x2 = x1 + xDir;
    const y2 = y1 + yDir;

    if (this.isValidAt(x1, y1) && this.isValidAt(x2, y2))
      if (this.compareSlotsAt(x1, y1, x2, y2))
        return 1 + this.checkDirectionAt(x2, y2, xDir, yDir);
    return 0;
  }

  setSlotAt(x, y, value, force = false) {
    const slot = this.getSlotAt(x, y);

    if (force || this.getSlotValueAt(x, y) === EMPTY) {
      slot.setAttribute("value", value);
      return this.updateSlot(slot);
    }
    return false;
  }

  compareSlotsAt(x1, y1, x2, y2) {
    if (this.getSlotValueAt(x1, y1) !== EMPTY)
      return this.getSlotValueAt(x1, y1) === this.getSlotValueAt(x2, y2);
    return false;
  }

  getSlotValueAt(x, y) {
    return Number(this.getSlotAt(x, y).getAttribute("value"));
  }

  getSlotAt(x, y) {
    return this.getCellAt(x, y).firstElementChild;
  }

  getCellAt(x, y) {
    return this.grid[y][x];
  }
}

function clearHTML(element) {
  element.innerHTML = "";
}

let gameBoard = new GameBoard();
