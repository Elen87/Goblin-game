
export default class Board {
  constructor(size = 4) {
    this.size = size;
    this.cells = [];
    this.boardElement = null;
  }

  init(boardElement) {
    this.boardElement = boardElement;
    this.render();
  }

  render() {
    if (!this.boardElement) return;
    this.boardElement.innerHTML = '';
    this.cells = [];

    const totalCells = this.size * this.size;
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      this.boardElement.append(cell);  // append вместо appendChild
      this.cells.push(cell);
    }
  }

  getCells() {
    return [...this.cells];
  }

  getRandomCell() {
    if (this.cells.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.cells.length);
    return this.cells[randomIndex];
  }

  clear() {
    if (this.boardElement) {
      this.boardElement.innerHTML = '';
    }
    this.cells = [];
  }
}
