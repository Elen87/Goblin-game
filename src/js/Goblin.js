
export default class Goblin {
  constructor() {
    this.element = null;
    this.isVisible = false;
    this.timeoutId = null;
    this.onHit = null;
    this.onMiss = null;
  }

  createElement() {
    if (this.element) {
      this.destroy();
    }
    
    this.element = document.createElement('img');
    this.element.className = 'goblin';
    this.element.alt = '👺 Goblin';
    this.element.style.width = '80%';
    this.element.style.height = '80%';
    this.element.style.position = 'absolute';
    this.element.style.top = '50%';
    this.element.style.left = '50%';
    this.element.style.transform = 'translate(-50%, -50%)';
    this.element.style.cursor = 'pointer';
    
    // Устанавливаем изображение по умолчанию
    this.element.src = 'https://raw.githubusercontent.com/netology-code/ahj-homeworks/master/dom/pic/goblin.png';
    
    // Обработчик клика
    this.element.addEventListener('click', (event) => {
      event.stopPropagation();
      if (this.isVisible && this.onHit) {
        this.onHit();
      }
    });
  }

  // Восстанавливаем метод setImage для тестов
  setImage(src) {
    if (!this.element) {
      this.createElement();
    }
    if (this.element) {
      this.element.src = src;
    }
  }

  show(cell) {
    // Создаём элемент если его нет
    if (!this.element) {
      this.createElement();
    }
    
    // Очищаем предыдущий таймер
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    // Прячем с предыдущей позиции
    this.hide();
    
    // Показываем в новой ячейке
    cell.append(this.element);
    this.isVisible = true;
    
    // Таймер на скрытие через 1 секунду
    this.timeoutId = setTimeout(() => {
      if (this.isVisible) {
        this.hide();
        if (this.onMiss) {
          this.onMiss();
        }
      }
    }, 1000);
  }

  hide() {
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
    this.isVisible = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  destroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
    this.element = null;
    this.isVisible = false;
  }
}
