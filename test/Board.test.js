
import Board from '../src/js/Board';

describe('Board', () => {
  let board;
  let container;

  beforeEach(() => {
    board = new Board(4);
    container = document.createElement('div');
    board.init(container);
  });

  test('should create 4x4 grid', () => {
    expect(board.getCells().length).toBe(16);
    expect(container.children.length).toBe(16);
  });

  test('should return all cells', () => {
    const cells = board.getCells();
    expect(cells.length).toBe(16);
    expect(cells[0]).toBeInstanceOf(HTMLDivElement);
  });

  test('should return random cell', () => {
    const cell = board.getRandomCell();
    expect(cell).toBeTruthy();
    expect(cell.className).toBe('cell');
  });

  test('should clear board', () => {
    board.clear();
    expect(board.getCells().length).toBe(0);
  });

  test('should handle render when no board element', () => {
    const newBoard = new Board(4);
    newBoard.render();
    expect(newBoard.getCells().length).toBe(0);
  });
})