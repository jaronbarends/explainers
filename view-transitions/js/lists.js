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
    .getElementById('add-elm-above-list-name-on-li')
    .addEventListener('click', addElmNameOnLi);

  document
    .getElementById('button-add-item-dynamic-names')
    .addEventListener('click', addListItemDynamicNames);
  document
    .getElementById('button-class-on-new-item')
    .addEventListener('click', addListItemWithClass);
}

function addListItemBasic() {
  const list = document.getElementById('list-basic');
  const li = createLi(list);
  startTransition(li, list, null);
}

function addListItemBasic2() {
  const list = document.getElementById('list-basic-2');
  const li = createLi(list);
  startTransition(li, list);
}

function addListItemNameOnLi() {
  const list = document.getElementById('list-name-on-li');
  const li = createLi(list);
  li.classList.add('list-item-name-on-li');
  const idx = list.children.length + 1;
  li.style.viewTransitionName = `list-item-name-on-li-${idx}`;
  startTransition(li, list);
}

function addElmNameOnLi() {
  const list = document.getElementById('list-name-on-li');
  document.startViewTransition(() => {
    const elm = document.createElement('div');
    elm.classList.add('random-elm');
    elm.innerHTML = "I'm a new <code>&lt;div&gt;<code>";
    list.before(elm);
  });
}

function addListItemDynamicNames() {
  const list = document.getElementById('list-dynamic-names');
  // children is an HTMLCollection that does not have forEach, so convert to array
  let lis = [...list.children];
  const transitionNameBase = 'list-item-dynamic-names';
  lis.forEach((li, idx) => {
    li.style.viewTransitionName = `${transitionNameBase}-${idx}`;
  });

  // const newLi = createLi(list);
  const newLi = document.createElement('li');
  newLi.textContent = '...';
  const idx = list.children.length;
  newLi.style.viewTransitionName = `${transitionNameBase}-${idx}`;
  newLi.classList.add('list-item-dynamic-names');

  // const transition = startTransition(newLi, list);
  const transition = document.startViewTransition(() => {
    transition = document.startViewTransition(() => {
      list.firstChild.after(newLi);
    });
  });

  transition.finished.then(() => {
    lis.forEach((li, idx) => {
      li.style.viewTransitionName = 'none';
    });
    newLi.style.viewTransitionName = 'none';
  });
}

function addListItemWithClass() {
  const list = document.getElementById('list-class-on-new-item');
  const li = createLi(list);
  const newItemClassName = 'list-item--inserted';
  li.classList.add(newItemClassName);

  const transition = startTransition(li, list);
  transition.finished.then(() => {
    li.classList.remove(newItemClassName);
  });
}

function createLi(list) {
  const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  const newLi = document.createElement('li');
  newLi.textContent = `Item ${numbers[list.children.length]}`;

  return newLi;
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
