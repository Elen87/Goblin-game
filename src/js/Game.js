
import Board from './Board';
import Goblin from './Goblin';
import Score from './Score';
import goblinImage from '../img/goblin.gif';

const BOARD_SIZE = 4;
const MAX_MISSES = 5;
const INTERVAL_DELAY = 1100;

export default class Game {
  constructor() {
    this.board = new Board(BOARD_SIZE);
    this.goblin = new Goblin();
    this.score = new Score(MAX_MISSES);
    this.isRunning = false;
    this.intervalId = null;
    this.boardElement = null;
  }

  init(boardElement) {
    this.boardElement = boardElement;
    this.board.init(boardElement);
    this.score.init();
    this.goblin.setImage(goblinImage);
    this.setupCallbacks();
  }

  setupCallbacks() {
    this.goblin.onHit = () => {
      if (!this.isRunning) return;
      this.score.addPoint();
      this.goblin.hide();
      this.showGoblinRandom();
    };

    this.goblin.onMiss = () => {
      if (!this.isRunning) return;
      const gameOver = this.score.addMiss();
      if (gameOver) {
        this.gameOver();
      } else {
        this.showGoblinRandom();
      }
    };
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.score.reset();
    this.showGoblinRandom();
    
    this.intervalId = setInterval(() => {
      if (this.isRunning && !this.goblin.isVisible) {
        this.showGoblinRandom();
      }
    }, INTERVAL_DELAY);
  }

  stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.goblin.destroy();
  }

  reset() {
    this.stop();
    this.start();
  }

  showGoblinRandom() {
    if (!this.isRunning) return;
    const randomCell = this.board.getRandomCell();
    if (randomCell) {
      this.goblin.show(randomCell);
    }
  }

  gameOver() {
    this.stop();
    setTimeout(() => {
      alert(`🎮 Игра окончена!\n🏆 Ваш счёт: ${this.score.getScore()}`);
    }, 50);
  }

  destroy() {
    this.stop();
    if (this.boardElement) {
      this.boardElement.innerHTML = '';
    }
    if (this.goblin) {
      this.goblin.destroy();
    }
  }
}
