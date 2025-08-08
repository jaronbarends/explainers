init();

function init() {
  initBasicManualExample();
}

function initBasicManualExample() {
  const popoverBasicManual = document.getElementById('popover-basic-manual');
  const popoverBasicManualShowBtn = document.getElementById('basic-manual-button-show');
  const popoverBasicManualHideBtn = document.getElementById('basic-manual-button-hide');
  const popoverBasicManualToggleBtn = document.getElementById('basic-manual-button-toggle');
  popoverBasicManualShowBtn.addEventListener('click', () => {
    popoverBasicManual.showPopover();
  })
  popoverBasicManualHideBtn.addEventListener('click', () => {
    popoverBasicManual.hidePopover();
  })
  popoverBasicManualToggleBtn.addEventListener('click', () => {
    popoverBasicManual.togglePopover();
  })
}