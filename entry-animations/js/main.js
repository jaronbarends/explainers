initToggleButtons();
initKeyFrameButton();

function initToggleButtons() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', handleToggle);
  });
}

function handleToggle(e) {
  const button = e.currentTarget;
  const box = document.getElementById(button.getAttribute('aria-controls'));
  box.classList.toggle('is-visible');
}

function initKeyFrameButton() {
  const button = document.getElementById('key-frame-button');
  button.removeEventListener('click', handleToggle);
  button.addEventListener('click', handleKeyFrameToggle);
}

function handleKeyFrameToggle(e) {
  const button = e.currentTarget;
  const box = document.getElementById(button.getAttribute('aria-controls'));
  if (box.classList.contains('is-visible')) {
    box.classList.remove('is-visible');
    box.classList.add('is-hidden');
  } else {
    box.classList.remove('is-hidden');
    box.classList.add('is-visible');
  }
}
