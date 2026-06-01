initToggleButtons();

function initToggleButtons() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const box = document.getElementById(button.getAttribute('aria-controls'));
      box.classList.toggle('is-visible');
    });
  });
}