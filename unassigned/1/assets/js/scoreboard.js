class Scoreboard {
  constructor(gameBoard, players, timeLimit = 0) {
    const aside = document.querySelector("aside");

    this.scores = [];
    this.players = [];
    this.scores.length = players;
    this.scores = this.scores.fill(0);
    this.paused = true;
    clearHTML(aside);
    for (let player = 0; player < players; ++player)
      this.players.push(`Player ${player + 1}`);
    this.setTimeLimit(timeLimit);
    setInterval(() => this.decrementTime(), 10);
    this.gameBoard = gameBoard;
    this.element = aside.appendChild(document.createElement("div"));
    this.element.classList.add("container", "scoreboard");
    this.initializeBoard();
    this.updateSlot();
    this.updateScore();
  }

  updateScore() {
    let currentPlayer = this.element.querySelector(".player-card .player-info");
    for (let player = 0; player < this.players.length; ++player) {
      currentPlayer.firstElementChild.textContent = this.players[player];
      currentPlayer.lastElementChild.textContent = this.scores[player];
      currentPlayer = currentPlayer.nextElementSibling;
    }
  }

  updateTime() {
    const time = this.element.querySelector(".time span");
    const s = Math.floor(this.currentTime / 100);
    const ms = (this.currentTime % 100).toString().padStart(2, "0");

    time.textContent = `${Math.floor(s)}.${ms}s`;
  }

  updateSlot() {
    const slot = this.element.querySelector(".slot");
    slot.classList.replace(slot.classList.item(1), this.gameBoard.pieces[this.gameBoard.currentPlayer]);
  }

  initializeBoard() {
    let currentElement;

    clearHTML(this.element);
    currentElement = this.element.appendChild(document.createElement("div"));
    currentElement.classList.add("container", "player-card");
    for (let player = 0; player < this.players.length; ++player) {
      currentElement = currentElement.appendChild(document.createElement("div"));
      currentElement.classList.add("container", "player-info");
      currentElement.appendChild(document.createElement("span")).classList.add("player");
      currentElement.appendChild(document.createElement("span")).classList.add("score");
      currentElement = currentElement.parentElement;
    }
    currentElement = this.element.appendChild(document.createElement("div"));
    currentElement.classList.add("container", "turn-card");
    currentElement = currentElement.appendChild(document.createElement("div"));
    currentElement.classList.add("container", "turn-item")
    currentElement.appendChild(document.createElement("div")).classList.add("slot", "empty");
    currentElement = currentElement.parentElement;
    currentElement = currentElement.appendChild(document.createElement("div"));
    currentElement.classList.add("container", "turn-item")
    currentElement = currentElement.appendChild(document.createElement("div"));
    currentElement.classList.add("time");
    currentElement.appendChild(document.createElement("span"));
  }

  incrementScore(player = this.gameBoard.currentPlayer) {
    return ++this.scores[player];
  }

  togglePause() {
    return this.paused = !this.paused;
  }

  setTimeLimit(time) {
    this.timeLimit = time * 100;
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
    this.updateTime();
    return this.currentTime;
  }
}
