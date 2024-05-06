// const samplesLists = document.querySelectorAll('.samples-list');
const btn = document.getElementById('button');

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
      const section = document.querySelector(`[data-sample-section-${idx}]`);
      toggleSamples(section);
    }
  });
}

function addTriggerListeners() {
  document.querySelectorAll('.trigger-button')
    .forEach(btn => {
      btn.addEventListener('click', e => {
        const section = btn.closest('.sample-section');
        toggleSamples(section);
      });
    })
}

// init duration pickers
// each picker has attrs data-duration-picker and data-duration-var-suffix
// upon selection, --duration-${var-suffix} is set to selected value
function initDurationPickers() {
  const pickersConfig = [
    {
      id: 'duration-picker-section-3',
      varSuffix: 'section-3',
      durations: [
        { value: '250ms', label: '250ms (default)', },
        { value: '1s', label: '1s', },
        { value: '3s', label: '3s', },
      ]
    },
    {
      id: 'duration-picker-section-4',
      varSuffix: 'section-4',
      durations: [
        { value: '250ms', label: '250ms (default)', },
        { value: '3s', label: '3s', },
      ]
    },
    {
      id: 'duration-picker-section-5',
      varSuffix: 'async-section-5',
      durations: [
        { value: '250ms', label: '250ms (default)', },
        { value: '500ms', label: '500ms', },
        { value: '3s', label: '3s', },
      ]
    },
  ]
  pickersConfig.forEach(createPicker);
}

function createPicker(pickerConfig) {
  const container = document.getElementById(pickerConfig.id);
  const picker = document.createElement('span');
  pickerConfig.durations.forEach((duration, i) => {
    addPickerRadio({ picker, pickerConfig, duration, i });
  })
  container.appendChild(picker);
  handleSelectDuration(picker, pickerConfig.varSuffix);
}

function addPickerRadio({ picker, pickerConfig, duration, i }) {
  const radio = document.createElement('input');
  const groupName = `duration-picker-radio-${pickerConfig.varSuffix}`
  const id = `${groupName}-${i}`
  radio.setAttribute('type', 'radio');
  radio.setAttribute('name', groupName);
  radio.setAttribute('value', duration.value);
  radio.setAttribute('id', id)
  if (i === 0) {
    radio.setAttribute('checked', 'checked');
  }
  radio.addEventListener('click', () => {
    handleSelectDuration(picker, pickerConfig.varSuffix);
  })
  const label = document.createElement('label');
  label.setAttribute('for', id)
  label.textContent = duration.label;

  picker.appendChild(radio);
  picker.appendChild(label);
}

function handleSelectDuration(picker, varSuffix) {
  const duration = picker.querySelector(':checked').value;
  document.documentElement.style.setProperty(`--duration-${varSuffix}`, duration);
}

function toggleSamplesClass(samples) {
  samples.classList.toggle('samples--alt');
}

function toggleSamples(section) {
  if (section) {
    const samples = section.querySelector('.samples');
    const transition = document.startViewTransition(() => toggleSamplesClass(samples))

    // transition.updateCallbackDone.then(() => {
    //   console.log('updateCallbackDone - callback function called');
    // })
  
    // transition.ready.then(() => {
    //   console.log('ready - pseudo element tree is created');
    // })
  
    // transition.ready.then(() => {
    //   console.log('finished - animation is finished; new page view is interactive');
    // })
  }
}