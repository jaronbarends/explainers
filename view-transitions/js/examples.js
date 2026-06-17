import { createDurationPickers } from './durationPickers.js';

init();

function init() {
  addTriggerListeners();
  initDurationPickers();
}

function addTriggerListeners() {
  // document
  //   .getElementById('section-basic__btn-add-item')
  //   .addEventListener('click', sectionBasic_addItem);
}

function sectionBasic_addItem() {
  const list = document.getElementById('section-basic__list');
  const newLi = createLi(list);
  startTransition(newLi, list, null);
}

// init duration pickers
// each picker has attr data-duration-id
// upon selection, --duration-${duration-id} is set to selected value
function initDurationPickers() {
  const durations = ['250ms', '500ms', '1s', '3s', '300s'];
  const defaultDuration = '1s';
  const pickersConfig = {
    durations,
    defaultDuration,
    overrides: {
      // ['picker-id']: {
      //   durations,
      //   defaultDuration: '500ms',
      // },
    },
  };
  createDurationPickers(pickersConfig);
}
