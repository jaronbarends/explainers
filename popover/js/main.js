init();

function init() {
  initBasicManualExample();
}

function initBasicManualExample() {
  const popover = document.getElementById('popover-basic-manual');
  const popoverShowBtn = document.getElementById('basic-manual-button-show');
  const popoverHideBtn = document.getElementById('basic-manual-button-hide');
  const popoverToggleBtn = document.getElementById('basic-manual-button-toggle');
  popoverShowBtn.addEventListener('click', () => {
    popover.showPopover();
  });
  popoverHideBtn.addEventListener('click', () => {
    popover.hidePopover();
  });
  popoverToggleBtn.addEventListener('click', () => {
    popover.togglePopover();
  });
}
