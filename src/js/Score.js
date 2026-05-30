
export default class Score {
  constructor(maxMisses = 5) {
    this.score = 0;
    this.misses = 0;
    this.maxMisses = maxMisses;
    this.scoreElement = null;
    this.missesElement = null;
    this.onGameEnd = null;
  }

  init() {
    this.scoreElement = document.getElementById('score');
    this.missesElement = document.getElementById('misses');
    this.updateDisplay();
  }

  addPoint() {
    this.score++;
    this.updateDisplay();
  }

  addMiss() {
    this.misses++;
    this.updateDisplay();
    
    const isGameOver = this.misses >= this.maxMisses;
    if (isGameOver && this.onGameEnd) {
      this.onGameEnd(this.score);
    }
    return isGameOver;
  }

  updateDisplay() {
    if (this.scoreElement) {
      this.scoreElement.textContent = this.score;
    }
    if (this.missesElement) {
      this.missesElement.textContent = this.misses;
    }
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    this.updateDisplay();
  }

  getScore() {
    return this.score;
  }
}
