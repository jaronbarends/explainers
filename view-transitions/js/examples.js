import { createDurationPickers } from './durationPickers.js';

init();

function init() {
  addTriggerListeners();
  initDurationPickers();
}

function addTriggerListeners() {
  document.querySelectorAll('[data-add-item-button]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const section = btn.closest('.samples-section');
      addListItems(section);
    });
  });
}

function addListItems(section) {
  const list = section.querySelectorAll('[data-dynamic-list');
  list.forEach(addListItem);
}

function addListItem(list) {
  const li = document.createElement('li');
  const newItemClassName = 'dynamic-list__item--new-item';
  li.classList.add('dynamic-list__item', newItemClassName);
  li.textContent = `Item ${list.children.length + 1}`;

  const firstItem = list.querySelector(':nth-child(1)');

  const transition = document.startViewTransition(() => {
    // list.appendChild(li);
    firstItem.after(li);
  });
  transition.finished.then(() => {
    li.classList.remove(newItemClassName);
  });
}

// init duration pickers
// each picker has attrs data-duration-picker and data-duration-var-suffix
// upon selection, --duration-${var-suffix} is set to selected value
function initDurationPickers() {
  const pickersConfig = [
    {
      id: 'duration-picker-section-adding-items',
      varSuffix: 'section-adding-items',
      durations: ['250ms', '500ms', '3s'],
    },
  ];
  createDurationPickers(pickersConfig);
}
