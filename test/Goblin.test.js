
import Goblin from '../src/js/Goblin';

describe('Goblin', () => {
  let goblin;
  let cell;

  beforeEach(() => {
    goblin = new Goblin();
    cell = document.createElement('div');
    jest.useFakeTimers();
  });

  afterEach(() => {
    goblin.destroy();
    jest.useRealTimers();
  });

  test('should create goblin element', () => {
    goblin.createElement();
    expect(goblin.element).toBeTruthy();
    expect(goblin.element.tagName).toBe('IMG');
    expect(goblin.element.className).toBe('goblin');
  });

  test('should set image source', () => {
    goblin.setImage('test-image.png');
    expect(goblin.element.src).toContain('test-image.png');
  });

  test('should show goblin in cell', () => {
    goblin.show(cell);
    expect(goblin.isVisible).toBe(true);
    expect(cell.contains(goblin.element)).toBe(true);
  });

  test('should hide goblin', () => {
    goblin.show(cell);
    goblin.hide();
    expect(goblin.isVisible).toBe(false);
    expect(goblin.element.parentNode).toBeNull();
  });

  test('should call onMiss after timeout', () => {
    const onMiss = jest.fn();
    goblin.onMiss = onMiss;
    goblin.show(cell);
    
    jest.advanceTimersByTime(1000);
    
    expect(onMiss).toHaveBeenCalled();
    expect(goblin.isVisible).toBe(false);
  });

  test('should not call onMiss if already hidden', () => {
    const onMiss = jest.fn();
    goblin.onMiss = onMiss;
    goblin.show(cell);
    goblin.hide();
    
    jest.advanceTimersByTime(1000);
    
    expect(onMiss).not.toHaveBeenCalled();
  });

  test('should call onHit when clicked', () => {
    const onHit = jest.fn();
    goblin.onHit = onHit;
    goblin.show(cell);
    
    goblin.element.click();
    
    expect(onHit).toHaveBeenCalled();
  });

  test('should not call onHit when not visible', () => {
    const onHit = jest.fn();
    goblin.onHit = onHit;
    goblin.show(cell);
    goblin.hide();
    
    goblin.element.click();
    
    expect(onHit).not.toHaveBeenCalled();
  });

  test('should destroy goblin', () => {
    goblin.show(cell);
    goblin.destroy();
    expect(goblin.element).toBeNull();
  });

  test('should create element automatically if not exists', () => {
    const newGoblin = new Goblin();
    const testCell = document.createElement('div');
    newGoblin.show(testCell);
    expect(newGoblin.element).toBeTruthy();
    newGoblin.destroy();
  });
})