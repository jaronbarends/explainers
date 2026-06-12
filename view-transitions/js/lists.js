import { createDurationPickers } from './durationPickers.js';

init();

function init() {
  addTriggerListeners();
  initDurationPickers();
}

function addTriggerListeners() {
  document
    .getElementById('section-basic__btn-add-item')
    .addEventListener('click', sectionBasic_addItem);
  document
    .getElementById('section-basic2__btn-add-item')
    .addEventListener('click', sectionBasic2_addItem);
  document
    .getElementById('section-name-on-li__btn-add-item')
    .addEventListener('click', sectionNameOnLi_addItem);
  document
    .getElementById('section-dynamic-names__btn-add-item')
    .addEventListener('click', sectionDynamicNames_addItem);
  document
    .getElementById('section-entry-animation__btn-add-item')
    .addEventListener('click', sectionEntryAnimation_addItem);
  document
    .getElementById('section-entry-exit__btn-add-item')
    .addEventListener('click', sectionEntryExit_addItem);
  document
    .getElementById('section-entry-exit__list')
    .addEventListener('click', sectionEntryExit_checkRemoveItem);

  const addElmBtns = document.querySelectorAll('[data-add-elm-to-preview]');
  addElmBtns.forEach((btn) => {
    btn.addEventListener('click', addElmToPreview);
  });
}

function sectionBasic_addItem() {
  const list = document.getElementById('list-basic');
  const newLi = createLi(list);
  startTransition(newLi, list, null);
}

function sectionBasic2_addItem() {
  const list = document.getElementById('section-basic2__list');
  const newLi = createLi(list);
  startTransition(newLi, list);
}

function sectionNameOnLi_addItem() {
  const list = document.getElementById('section-name-on-li__list');
  const newLi = createLi(list);
  const idx = list.children.length + 1;
  newLi.style.viewTransitionName = `section-name-on-li__item-${idx}`;
  startTransition(newLi, list);
}

function sectionDynamicNames_addItem() {
  const list = document.getElementById('section-dynamic-names__list');
  // children is an HTMLCollection that does not have forEach, so convert to array
  let lis = [...list.children];
  const transitionNameBase = 'section-dynamic-names__item';
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
    lis.forEach((li) => {
      li.style.viewTransitionName = 'none';
    });
    newLi.style.viewTransitionName = 'none';
  });
}

function sectionEntryAnimation_addItem() {
  const list = document.getElementById('section-entry-animation__list');
  // children is an HTMLCollection that does not have forEach, so convert to array
  const lis = [...list.children];
  lis.forEach((li, idx) => {
    li.style.viewTransitionName = `section-entry-animation__item-existing-${idx}`;
  });

  const newLi = document.createElement('li');
  newLi.style.viewTransitionName = 'section-entry-animation__item-inserted';
  newLi.textContent = `Item ${list.children.length + 1}`;

  // in real-world code, add fallback
  const transition = document.startViewTransition(() => {
    const firstLi = list.querySelector('li');
    firstLi.after(newLi);
  });

  transition.finished.then(() => {
    lis.forEach((li) => {
      li.style.viewTransitionName = 'none';
    });
    newLi.style.viewTransitionName = 'none';
  });
}

function sectionEntryExit_checkRemoveItem(evt) {
  if (!evt.target.tagName === 'BUTTON') {
    return;
  }
  const liToRemove = evt.target.closest('li');
  sectionEntryExit_removeItem(liToRemove);
}

function sectionEntryExit_addItem() {
  const list = document.getElementById('section-entry-exit__list');
  addTransitionNamesAndClass({
    list,
    transitionNameBase: 'section-entry-exit__item-existing',
    transitionClass: 'section-entry-exit__item-existing--with-entry',
  });

  const newLi = document.createElement('li');
  newLi.style.viewTransitionName = 'section-entry-exit__item-inserted';
  newLi.innerHTML = `Item ${list.children.length + 1} <button>Remove</button>`;

  const transition = document.startViewTransition(() => {
    const firstLi = list.querySelector('li');
    firstLi.after(newLi);
  });
  transition.finished.then(() => {
    removeTransitionNames(list);
  });
}

function sectionEntryExit_removeItem(liToRemove) {
  const list = document.getElementById('section-entry-exit__list');
  addTransitionNamesAndClass({
    list,
    transitionNameBase: 'section-entry-exit__item-existing',
    transitionClass: 'section-entry-exit__item-existing--with-exit',
  });

  liToRemove.style.viewTransitionName = 'section-entry-exit__item-removed';
  const transition = document.startViewTransition(() => {
    liToRemove.remove();
  });
  transition.finished.then(() => {
    removeTransitionNames(list);
  });
}

function addTransitionNamesAndClass({ list, transitionNameBase, transitionClass }) {
  // children is an HTMLCollection that does not have forEach, so convert to array
  let lis = [...list.children];
  lis.forEach((li, idx) => {
    li.style.viewTransitionClass = transitionClass;
    li.style.viewTransitionName = `${transitionNameBase}-${idx}`;
  });
}

function removeTransitionNames(list) {
  let lis = [...list.children];
  lis.forEach((li) => {
    li.style.viewTransitionName = 'none';
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
    durations: ['250ms', '500ms', '1s', '3s', '300s'],
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
