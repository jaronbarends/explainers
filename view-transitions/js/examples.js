import { createDurationPickers } from './durationPickers.js';

init();

function init() {
  addTriggerListeners();
  initDurationPickers();
}

function addTriggerListeners() {
  document.getElementById('button-add-item-basic').addEventListener('click', addListItemBasic);
  document.getElementById('button-add-item-basic-2').addEventListener('click', addListItemBasic2);
  document
    .getElementById('button-add-item-name-on-li')
    .addEventListener('click', addListItemNameOnLi);
  document
    .getElementById('button-add-class-on-item')
    .addEventListener('click', addListItemWithClass);
}

function addListItemBasic(evt) {
  const list = getListByClickEvent(evt);
  const li = createLi(list);
  startTransition(li, list, null);
}

function addListItemBasic2(evt) {
  const list = getListByClickEvent(evt);
  const li = createLi(list);
  startTransition(li, list);
}

function addListItemNameOnLi(evt) {
  const list = getListByClickEvent(evt);
  console.log('list:', list);
  const li = createLi(list);
  li.classList.add('list-item-name-on-li');
  const idx = list.children.length + 1;
  li.style.viewTransitionName = `list-item-name-on-li-${idx}`;
  startTransition(li, list);
}

function addListItemWithClass(evt) {
  const list = getListByClickEvent(evt);
  const li = createLi(list);
  const newItemClassName = 'dynamic-list__item--new-item';
  li.classList.add('dynamic-list__item', newItemClassName);

  const transition = startTransition(li, list);
  transition.finished.then(() => {
    li.classList.remove(newItemClassName);
  });
}

function createLi(list) {
  const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  const li = document.createElement('li');
  li.classList.add('dynamic-list__item');
  li.textContent = `Item ${numbers[list.children.length]}`;

  return li;
}

function startTransition(li, list, position = 2) {
  let transition;
  if (position === null) {
    transition = document.startViewTransition(() => {
      list.append(li);
    });
  } else {
    const prevPos = Math.min(position - 1, list.children.length);
    const prevItem = list.querySelector(`:nth-child(${prevPos})`);
    transition = document.startViewTransition(() => {
      prevItem.after(li);
    });
  }
  return transition;
}

function getListByClickEvent(evt) {
  const section = evt.currentTarget.closest('section');
  if (!section) {
    return undefined;
  }
  return section.querySelector('[data-dynamic-list');
}

// init duration pickers
// each picker has attr data-duration-id
// upon selection, --duration-${duration-id} is set to selected value
function initDurationPickers() {
  const pickersConfig = {
    durations: ['250ms', '500ms', '1s', '3s'],
    defaultDuration: '1s',
    overrides: {
      // ['duration-id']: {
      //   durations: [],
      //   defaultDuration: '...',
      // }
    },
  };
  createDurationPickers(pickersConfig);
}
