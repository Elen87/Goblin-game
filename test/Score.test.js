
import Score from '../src/js/Score';

describe('Score', () => {
  let score;

  beforeEach(() => {
    score = new Score(5);
    document.body.innerHTML = `
      <span id="score">0</span>
      <span id="misses">0</span>
    `;
    score.init();
  });

  test('should initialize with zero values', () => {
    expect(score.getScore()).toBe(0);
    expect(score.misses).toBe(0);
  });

  test('should add point correctly', () => {
    score.addPoint();
    expect(score.getScore()).toBe(1);
    expect(document.getElementById('score').textContent).toBe('1');
  });

  test('should add miss correctly', () => {
    const result = score.addMiss();
    expect(score.misses).toBe(1);
    expect(document.getElementById('misses').textContent).toBe('1');
    expect(result).toBe(false);
  });

  test('should end game after max misses', () => {
    let gameEnded = false;
    score.onGameEnd = () => {
      gameEnded = true;
    };
    
    for (let i = 0; i < 5; i++) {
      score.addMiss();
    }
    
    expect(gameEnded).toBe(true);
  });

  test('should reset score', () => {
    score.addPoint();
    score.addMiss();
    score.reset();
    
    expect(score.getScore()).toBe(0);
    expect(score.misses).toBe(0);
    expect(document.getElementById('score').textContent).toBe('0');
    expect(document.getElementById('misses').textContent).toBe('0');
  });

  test('should not fail when display elements missing', () => {
    document.body.innerHTML = '';
    const newScore = new Score(5);
    newScore.init();
    newScore.addPoint();
    expect(newScore.getScore()).toBe(1);
  });

  test('should handle onGameEnd callback', () => {
    const newScore = new Score(3);
    document.body.innerHTML = '<span id="score">0</span><span id="misses">0</span>';
    newScore.init();
    
    let gameEnded = false;
    newScore.onGameEnd = () => {
      gameEnded = true;
    };
    
    newScore.addMiss();
    newScore.addMiss();
    newScore.addMiss();
    
    expect(gameEnded).toBe(true);
  });
})