/*
Duration pickers:
Each picker has a data-duration-id.
Upon selection, --duration-${duration-id} is set to selected value
*/

export function createDurationPickers(pickersConfig) {
  const pickerElms = document.querySelectorAll('[data-duration-id]');
  pickerElms.forEach((pickerElm) => {
    const durationId = pickerElm.getAttribute('data-duration-id');
    const overrides = pickersConfig.overrides[durationId] || {};
    const pickerConfig = {
      durationId,
      durations: pickersConfig.durations,
      defaultDuration: pickersConfig.defaultDuration,
      ...overrides,
    };
    createDurationPicker(pickerConfig);
  });
}

function createDurationPicker(pickerConfig) {
  const container = document.querySelector(`[data-duration-id="${pickerConfig.durationId}"]`);
  if (!container) {
    console.error(`no element found with data-duration-id ${pickerConfig.durationId}`);
    return;
  }
  const picker = document.createElement('span');
  picker.classList.add('picker-radios');
  pickerConfig.durations.forEach((duration, i) => {
    addPickerRadio({ picker, pickerConfig, duration, i });
  });
  const instruction = document.createElement('span');
  instruction.innerHTML = 'Set <code>--duration&hellip;</code> for examples below:';
  container.append(instruction);
  container.append(picker);
  handleSelectDuration(picker, pickerConfig.durationId);
}

function addPickerRadio({ picker, pickerConfig, duration, i }) {
  const radio = document.createElement('input');
  const groupName = `duration-picker-radio-${pickerConfig.durationId}`;
  const id = `${groupName}-${i}`;
  radio.setAttribute('type', 'radio');
  radio.setAttribute('name', groupName);
  radio.setAttribute('value', duration);
  radio.setAttribute('id', id);
  if ((!pickerConfig.defaultDuration && i === 0) || duration === pickerConfig.defaultDuration) {
    radio.setAttribute('checked', 'checked');
  }
  radio.addEventListener('click', () => {
    handleSelectDuration(picker, pickerConfig.durationId);
  });
  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.textContent = duration;
  if (duration === '250ms') {
    label.textContent += ' (browser default)';
  }

  label.prepend(radio);
  picker.appendChild(label);
}

function handleSelectDuration(picker, durationId) {
  const duration = picker.querySelector(':checked').value;
  document.documentElement.style.setProperty(`--duration-${durationId}`, duration);
}
