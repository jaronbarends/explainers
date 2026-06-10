import { createDurationPickers } from './durationPickers.js';

init();

function init() {
  addTriggerListeners();
  initDurationPickers();
}

function addTriggerListeners() {
  document.getElementById('button-add-item-basic').addEventListener('click', addListItemBasic);
  document
    .getElementById('button-add-item-basic-plus')
    .addEventListener('click', addListItemBasicPlus);
  document
    .getElementById('button-add-class-on-item')
    .addEventListener('click', addListItemWithClass);
}

function addListItemBasicAtEnd(evt) {
  const list = getListByClickEvent(evt);
  const li = createLi(list);
  startTransition(li, list, null);
}

function addListItemBasic(evt) {
  const list = getListByClickEvent(evt);
  const li = createLi(list);
  startTransition(li, list);
}

function addListItemBasicPlus(evt) {
  const list = getListByClickEvent(evt);
  console.log('list:', list);
  const li = createLi(list);
  const idx = list.children.length + 1;
  li.style.viewTransitionName = `list-item-basic-plus-${idx}`;
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
// each picker has attrs data-duration-picker and data-duration-var-suffix
// upon selection, --duration-${var-suffix} is set to selected value
function initDurationPickers() {
  const defaultDurations = ['250ms', '500ms', '3s'];
  const defaultDefaultDuration = '3s';
  const pickersConfig = [
    {
      id: 'duration-picker-section-basic',
      varSuffix: 'section-basic',
      durations: defaultDurations,
      defaultDuration: defaultDefaultDuration,
    },
    {
      id: 'duration-picker-section-basic-2',
      varSuffix: 'section-basic-2',
      durations: defaultDurations,
      defaultDuration: defaultDefaultDuration,
    },
    {
      id: 'duration-picker-section-basic-plus',
      varSuffix: 'section-basic-plus',
      durations: defaultDurations,
      defaultDuration: defaultDefaultDuration,
    },
    {
      id: 'duration-picker-section-class-on-item',
      varSuffix: 'section-class-on-item',
      durations: defaultDurations,
      defaultDuration: defaultDefaultDuration,
    },
  ];
  createDurationPickers(pickersConfig);
}
