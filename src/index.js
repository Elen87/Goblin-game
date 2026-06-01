
import './styles/main.css';
import Game from './js/Game';

let game; // Объявляем переменную вне блока
const boardElement = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');
const modal = document.getElementById('game-over-modal');
const finalScoreSpan = document.getElementById('final-score');
const modalRestartBtn = document.getElementById('modal-restart-btn');

// Функция создания новой игры
function createNewGame() {
  if (game) {
    game.destroy();
  }
  game = new Game();
  game.init(boardElement);
  game.start();
  
  // Настройка окончания игры через модальное окно
  game.score.onGameEnd = (finalScore) => {
    finalScoreSpan.textContent = `🏆 Ваш счёт: ${finalScore}`;
    modal.style.display = 'flex';
  };
}

// Перезапуск игры из модального окна
modalRestartBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  if (game) {
    game.destroy();
  }
  createNewGame();
});

// Кнопка сброса
resetBtn.addEventListener('click', () => {
  if (game) {
    game.reset();
  }
});

// Закрытие модального окна при клике вне его
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    if (game) {
      game.destroy();
    }
    createNewGame();
  }
});

// Запуск игры
createNewGame();

if (module.hot) {
  module.hot.accept();
}
