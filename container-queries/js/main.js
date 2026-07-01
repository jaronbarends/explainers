initResetButton();
initContainerSizes();

function initResetButton() {
  const btn = document.getElementById('reset-btn');
  btn.addEventListener('click', resetContainerSizes);
}

function resetContainerSizes() {
  const containers = document.querySelectorAll('[data-resizer]');
  containers.forEach((container) => {
    container.style.width = 'auto';
  });
}

function initContainerSizes() {
  const resizers = document.querySelectorAll('.resizer');

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      updateContainerSizes(entry.target);
    }
  });

  resizers.forEach((resizer) => {
    observer.observe(resizer);
    updateContainerSizes(resizer);
  });
}

function updateContainerSizes(resizer) {
  const containers = resizer.querySelectorAll('[class*="container"]');
  containers.forEach((container) => {
    container.dataset.width = getContainerWidth(container);
    if (resizer.hasAttribute('data-resizer-size')) {
      container.dataset.height = getContainerHeight(container);
    }
  });
}

function getContainerWidth(container) {
  const style = getComputedStyle(container);
  const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  const borderX = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
  const widthPx = container.getBoundingClientRect().width - paddingX - borderX;
  const widthRem = Math.round((10 * widthPx) / 16) / 10;
  return `⟷ ${widthRem}rem`;
}

function getContainerHeight(container) {
  const style = getComputedStyle(container);
  const paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
  const borderY = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
  const heightPx = container.getBoundingClientRect().height - paddingY - borderY;
  const heightRem = Math.round((10 * heightPx) / 16) / 10;
  return `↕ ${heightRem}rem`;
}
