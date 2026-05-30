
import Game from '../src/js/Game';

describe('Game', () => {
  let game;
  let boardElement;

  beforeEach(() => {
    game = new Game();
    boardElement = document.createElement('div');
    boardElement.id = 'game-board';
    document.body.appendChild(boardElement);
    
    const scoreElement = document.createElement('span');
    scoreElement.id = 'score';
    const missesElement = document.createElement('span');
    missesElement.id = 'misses';
    document.body.appendChild(scoreElement);
    document.body.appendChild(missesElement);
    
    game.init(boardElement);
    jest.useFakeTimers();
  });

  afterEach(() => {
    if (game && game.destroy) {
      game.destroy();
    }
    document.body.innerHTML = '';
    jest.useRealTimers();
  });

  test('should initialize game', () => {
    expect(game.board).toBeTruthy();
    expect(game.goblin).toBeTruthy();
    expect(game.score).toBeTruthy();
    expect(game.boardElement).toBe(boardElement);
  });

  test('should start game', () => {
    game.start();
    expect(game.isRunning).toBe(true);
    expect(game.intervalId).toBeTruthy();
  });

  test('should not start if already running', () => {
    game.start();
    game.start();
    expect(game.isRunning).toBe(true);
  });

  test('should stop game', () => {
    game.start();
    game.stop();
    expect(game.isRunning).toBe(false);
    expect(game.intervalId).toBeNull();
  });

  test('should reset game', () => {
    game.start();
    game.score.addPoint();
    game.score.addMiss();
    game.reset();
    expect(game.score.getScore()).toBe(0);
    expect(game.isRunning).toBe(true);
  });

  test('should show goblin randomly', () => {
    game.start();
    game.showGoblinRandom();
    expect(game.goblin.isVisible).toBe(true);
  });

  test('should handle goblin hit', () => {
    game.start();
    const initialScore = game.score.getScore();
    
    game.goblin.onHit();
    
    expect(game.score.getScore()).toBe(initialScore + 1);
  });

  test('should handle goblin miss', () => {
    game.start();
    const initialMisses = game.score.misses;
    
    game.goblin.onMiss();
    
    expect(game.score.misses).toBe(initialMisses + 1);
  });

  test('should end game after 5 misses', () => {
    game.start();
    
    for (let i = 0; i < 5; i++) {
      game.goblin.onMiss();
    }
    
    expect(game.isRunning).toBe(false);
  });

  test('should destroy game', () => {
    game.start();
    game.destroy();
    expect(boardElement.innerHTML).toBe('');
  });

  test('should not show goblin when game not running', () => {
    game.showGoblinRandom();
    expect(game.goblin.isVisible).toBeFalsy();
  });
})