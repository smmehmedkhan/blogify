class Masonry {
  constructor(container, options = {}) {
    this.container =
      typeof container === 'string'
        ? document.querySelector(container)
        : container;
    if (!this.container) return;

    this.gap = options.gap || 16;
    this.minItemWidth = options.minItemWidth || 300;
    this.resizeTimeout = null;

    this.init();
  }

  getColumns() {
    const containerWidth = this.container.offsetWidth;
    return Math.max(
      1,
      Math.floor(containerWidth / (this.minItemWidth + this.gap)),
    );
  }

  init() {
    this.container.style.position = 'relative';

    // Wait for images to load before initial layout
    this.waitForImages().then(() => {
      this.layout();
    });

    // Debounced resize handler
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.layout(), 250);
    });
  }

  waitForImages() {
    const images = this.container.querySelectorAll('img');
    const promises = Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
    return Promise.all(promises);
  }

  layout() {
    const items = [...this.container.children];
    if (items.length === 0) return;

    // Get container padding
    const containerStyle = getComputedStyle(this.container);
    const paddingTop = parseFloat(containerStyle.paddingTop);
    const paddingLeft = parseFloat(containerStyle.paddingLeft);
    const paddingRight = parseFloat(containerStyle.paddingRight);

    const columns = this.getColumns();
    const columnHeights = new Array(columns).fill(paddingTop);
    const availableWidth =
      this.container.offsetWidth - paddingLeft - paddingRight;
    const itemWidth = (availableWidth - this.gap * (columns - 1)) / columns;

    items.forEach((item) => {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));

      item.style.position = 'absolute';
      item.style.width = `${itemWidth}px`;
      item.style.left = `${paddingLeft + shortestColumn * (itemWidth + this.gap)}px`;
      item.style.top = `${columnHeights[shortestColumn]}px`;

      columnHeights[shortestColumn] += item.offsetHeight + this.gap;
    });

    const containerStyle2 = getComputedStyle(this.container);
    const paddingBottom = parseFloat(containerStyle2.paddingBottom);
    this.container.style.height = `${Math.max(...columnHeights) + paddingBottom}px`;
  }
}

// Initialize masonry when DOM is ready
function initMasonry() {
  const containers = document.querySelectorAll('.blogs__grid');
  containers.forEach((container) => {
    new Masonry(container, { gap: 16, minItemWidth: 300 });
  });
}

// Run on DOM ready and after dynamic content loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMasonry);
} else {
  initMasonry();
}
