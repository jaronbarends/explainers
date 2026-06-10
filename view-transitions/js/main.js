import { createDurationPickers } from './durationPickers.js';

init();

function init() {
  addKeyListeners();
  addTriggerListeners();
  initDurationPickers();
}

function addKeyListeners() {
  document.addEventListener('keyup', (e) => {
    const regex = /(?:Digit|Numpad)([0-9])/;
    const matches = e.code.match(regex);
    if (e.code.match(regex)) {
      const idx = matches[1];
      const section = document.querySelector(`[data-samples-section-${idx}]`);
      toggleSamples(section);
    }
  });
}

function addTriggerListeners() {
  document.querySelectorAll('[data-toggle-button]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const section = btn.closest('.samples-section');
      toggleSamples(section);
    });
  });
}

// init duration pickers
// each picker has attr data-duration-id
// upon selection, --duration-${duration-id} is set to selected value
function initDurationPickers() {
  const pickersConfig = {
    durations: ['250ms', '1s', '3s', '300s'],
    defaultDuration: '250ms',
    overrides: {
      ['section-3']: {
        durations: ['250ms', '1s', '3s', '300s'],
      },
      ['section-4']: {
        durations: ['250ms', '3s', '300s'],
      },
      ['async-section-5']: {
        durations: ['250ms', '500ms', '3s'],
      },
    },
  };
  createDurationPickers(pickersConfig);
}

function toggleSamplesClass(samples) {
  samples.classList.toggle('samples--alt');
}

function toggleSamples(section) {
  if (section) {
    const samples = section.querySelector('.samples');
    if (!document.startViewTransition) {
      // fallback for browsers that don't have support
      toggleSamplesClass(data);
      return;
    }
    const transition = document.startViewTransition(() => toggleSamplesClass(samples));

    // transition.updateCallbackDone.then(() => {
    //   console.log('updateCallbackDone - callback function called');
    // });

    // transition.ready.then(() => {
    //   console.log('ready - pseudo element tree is created');
    // });

    // transition.finished.then(() => {
    //   console.log('finished - animation is finished; new page view is interactive');
    // });
  }
}
