
import './styles/main.css';
import Game from './js/Game';

const game = new Game();
const boardElement = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');
const modal = document.getElementById('game-over-modal');
const finalScoreSpan = document.getElementById('final-score');
const modalRestartBtn = document.getElementById('modal-restart-btn');

// Настройка окончания игры через модальное окно
game.score.onGameEnd = (finalScore) => {
  finalScoreSpan.textContent = `🏆 Ваш счёт: ${finalScore}`;
  modal.style.display = 'flex';
};

// Закрытие модального окна и перезапуск игры
modalRestartBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  game.reset();
});

// Кнопка сброса
resetBtn.addEventListener('click', () => {
  game.reset();
});

// Закрытие модального окна при клике вне его
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    game.reset();
  }
});

game.init(boardElement);
game.start();

if (module.hot) {
  module.hot.accept();
}
