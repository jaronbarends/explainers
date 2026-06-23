initResetButton();

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
