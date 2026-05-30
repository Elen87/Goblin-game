import './styles/main.css';
import Game from './js/Game';

const game = new Game();
const boardElement = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');

game.init(boardElement);
game.start();

resetBtn.addEventListener('click', () => {
  game.reset();
});

if (module.hot) {
  module.hot.accept();
}
