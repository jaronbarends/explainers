(() => {

  

  // (optional) tell jshint about globals (they should remain commented out)
  /* globals someGlobalVar */ // Tell jshint someGlobalVar exists as global var


  /**
	* initialize all
	* @param {string} varname Description
	* @returns {undefined}
	*/
  const init = function () {

  };

  // kick of the script when all dom content has loaded
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
