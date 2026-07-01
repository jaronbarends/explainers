initResetButton();
initContainerWidths();

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

function initContainerWidths() {
  const resizers = document.querySelectorAll('.resizer');

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      updateContainerWidths(entry.target);
    }
  });

  resizers.forEach((resizer) => {
    observer.observe(resizer);
    updateContainerWidths(resizer);
  });
}

function updateContainerWidths(resizer) {
  const containers = resizer.querySelectorAll('[class*="container"]');
  containers.forEach((container) => {
    // const widthPx = container.getBoundingClientRect().width;
    const style = getComputedStyle(container);
    const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const borderX = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    const widthPx = container.getBoundingClientRect().width - paddingX - borderX;
    const widthRem = Math.round((10 * widthPx) / 16) / 10;
    container.dataset.width = `⟷ ${widthRem}rem`;
    // container.dataset.width = `width:<> ${widthRem}rem`;
    // container.dataset.width = widthPx;
  });
}
