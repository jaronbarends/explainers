export function createDurationPickers(pickersConfig) {
  pickersConfig.forEach(createDurationPicker);
}

function createDurationPicker(pickerConfig) {
  const container = document.getElementById(pickerConfig.id);
  if (!container) {
    console.error(`no element found with id ${pickerConfig.id}`);
    return;
  }
  const picker = document.createElement('span');
  picker.classList.add('picker-radios');
  pickerConfig.durations.forEach((duration, i) => {
    addPickerRadio({ picker, pickerConfig, duration, i });
  });
  const instruction = document.createElement('span');
  instruction.innerHTML = 'Set <code>--duration</code> for examples below:';
  container.append(instruction);
  container.append(picker);
  handleSelectDuration(picker, pickerConfig.varSuffix);
}

function addPickerRadio({ picker, pickerConfig, duration, i }) {
  const radio = document.createElement('input');
  const groupName = `duration-picker-radio-${pickerConfig.varSuffix}`;
  const id = `${groupName}-${i}`;
  radio.setAttribute('type', 'radio');
  radio.setAttribute('name', groupName);
  radio.setAttribute('value', duration);
  radio.setAttribute('id', id);
  if ((!pickerConfig.defaultDuration && i === 0) || duration === pickerConfig.defaultDuration) {
    radio.setAttribute('checked', 'checked');
  }
  radio.addEventListener('click', () => {
    handleSelectDuration(picker, pickerConfig.varSuffix);
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

function handleSelectDuration(picker, varSuffix) {
  const duration = picker.querySelector(':checked').value;
  document.documentElement.style.setProperty(`--duration-${varSuffix}`, duration);
}
