
export default class Goblin {
  constructor() {
    this.element = null;
    this.isVisible = false;
    this.timeoutId = null;
    this.onHit = null;
    this.onMiss = null;
  }

  createElement() {
    this.element = document.createElement('img');
    this.element.className = 'goblin';
    this.element.alt = 'Goblin';
    this.element.style.width = '80%';
    this.element.style.height = '80%';
    this.element.style.position = 'absolute';
    this.element.style.top = '50%';
    this.element.style.left = '50%';
    this.element.style.transform = 'translate(-50%, -50%)';
    
    this.element.addEventListener('click', (event) => {
      event.stopPropagation();
      if (this.isVisible && this.onHit) {
        this.onHit();
      }
    });
  }

  setImage(src) {
    if (!this.element) {
      this.createElement();
    }
    this.element.src = src;
  }

  show(cell) {
    if (!this.element) {
      this.createElement();
    }
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    
    this.hide();
    cell.appendChild(this.element);
    this.isVisible = true;
    
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
    this.hide();
    this.element = null;
  }
}
