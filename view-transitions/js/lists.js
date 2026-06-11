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
    .getElementById('button-add-item-dynamic-names')
    .addEventListener('click', addListItemDynamicNames);
  document
    .getElementById('button-add-item-separate-animation')
    .addEventListener('click', addListItemAnimateInserted);

  const addElmBtns = document.querySelectorAll('[data-add-elm-to-preview]');
  addElmBtns.forEach((btn) => {
    btn.addEventListener('click', addElmToPreview);
  });
}

function addListItemBasic() {
  const list = document.getElementById('list-basic');
  const newLi = createLi(list);
  startTransition(newLi, list, null);
}

function addListItemBasic2() {
  const list = document.getElementById('list-basic-2');
  const newLi = createLi(list);
  startTransition(newLi, list);
}

function addListItemNameOnLi() {
  const list = document.getElementById('list-name-on-li');
  const newLi = createLi(list);
  newLi.classList.add('list-item-name-on-li');
  const idx = list.children.length + 1;
  newLi.style.viewTransitionName = `list-item-name-on-li-${idx}`;
  startTransition(newLi, list);
}

function addElmToPreview(evt) {
  const section = evt.currentTarget.closest('section');
  const preview = section.querySelector('.preview');
  document.startViewTransition(() => {
    const elm = document.createElement('div');
    elm.classList.add('random-elm');
    elm.innerHTML = "I'm a new <code>&lt;div&gt;<code>";
    preview.prepend(elm);
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

  const newLi = document.createElement('li');
  newLi.textContent = `Item ${list.children.length + 1}`;
  newLi.style.viewTransitionName = `${transitionNameBase}-new`;

  // in real-world code, add fallback
  const transition = document.startViewTransition(() => {
    const firstLi = list.querySelector('li');
    firstLi.after(newLi);
  });

  transition.finished.then(() => {
    lis.forEach((li, idx) => {
      li.style.viewTransitionName = 'none';
    });
    newLi.style.viewTransitionName = 'none';
  });
}

function addListItemAnimateInserted() {
  const list = document.getElementById('list-separate-animation');
  // children is an HTMLCollection that does not have forEach, so convert to array
  let lis = [...list.children];
  lis.forEach((li, idx) => {
    li.style.viewTransitionName = `list-item-existing-${idx}`;
  });

  const newLi = document.createElement('li');
  const newLiClassName = 'list-item-inserted';
  newLi.textContent = `Item ${list.children.length + 1}`;
  newLi.classList.add(newLiClassName);

  // in real-world code, add fallback
  const transition = document.startViewTransition(() => {
    const firstLi = list.querySelector('li');
    firstLi.after(newLi);
  });

  transition.finished.then(() => {
    lis.forEach((li, idx) => {
      li.style.viewTransitionName = 'none';
    });
    newLi.classList.remove(newLiClassName);
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
