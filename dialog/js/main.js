init();

function init() {
  initBasicExample();
  initBasicNonModalExample();
}

function initBasicExample() {
  const dialog = document.getElementById('basic-dialog');
  const btn = document.getElementById('basic-dialog-btn');
  btn.addEventListener('click', () => {
    dialog.showModal();
  })
}

function initBasicNonModalExample() {
  const dialog = document.getElementById('basic-non-modal-dialog');
  const btn = document.getElementById('basic-non-modal-dialog-btn');
  btn.addEventListener('click', () => {
    dialog.show();
  })
}