
import Board from './Board';
import Goblin from './Goblin';
import Score from './Score';

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
    this.lastPosition = -1;
  }

  init(boardElement) {
    this.boardElement = boardElement;
    this.board.init(boardElement);
    this.score.init();
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
    this.lastPosition = -1;
    
    // Пересоздаём гоблина для нового цикла игры
    this.goblin.destroy();
    this.goblin = new Goblin();
    this.setupCallbacks();
    
    // Показываем гоблина в случайной позиции
    setTimeout(() => {
      if (this.isRunning) {
        this.showGoblinRandom();
      }
    }, 100);
    
    // Запускаем интервал
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
  }

  reset() {
    this.stop();
    this.start();
  }

  getRandomPositionWithoutRepeat() {
    const totalCells = this.board.cells.length;
    if (totalCells === 0) return 0;
    
    let newPosition;
    let attempts = 0;
    do {
      newPosition = Math.floor(Math.random() * totalCells);
      attempts++;
      if (attempts > 100) break; // Защита от бесконечного цикла
    } while (newPosition === this.lastPosition && totalCells > 1);
    
    this.lastPosition = newPosition;
    return newPosition;
  }

  showGoblinRandom() {
    if (!this.isRunning) return;
    if (!this.board.cells.length) return;
    if (!this.goblin) return;
    
    const randomIndex = this.getRandomPositionWithoutRepeat();
    const randomCell = this.board.cells[randomIndex];
    
    if (randomCell) {
      this.goblin.show(randomCell);
    }
  }

  gameOver() {
    this.stop();
    if (this.score.onGameEnd) {
      this.score.onGameEnd(this.score.getScore());
    }
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
