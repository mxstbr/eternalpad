var textarea, localStorageSupported;

window.onload = function() {
  // Get textarea and test for localStorage support
  textarea = document.querySelector('.textarea');
  localStorageSupported = localStorageTest();

  if (localStorageSupported === true) {
    // Set the initial Content to the previously saved one, or to the default one
    var initialContent = localStorage.getItem('content') || 'Welcome to Eternalpad.\n\nWrite something here, then refresh the page.\nYour note will still be here, waiting for you.';
    textarea.value = initialContent;
    // Save the text onkeyup and onblur
    textarea.onkeyup = changeContent;
    textarea.onblur = changeContent;
    // Focus textarea to open virtual keyboards on touch devices
    textarea.focus();
  } else {
    // If local storage is not supported, display an error message
    textarea.value = "Sorry, your browser is not supported by Eternalpad. Switch to a modern browser to get full functionality.";
  }

  // Analytics
  var owa_baseUrl = 'http://analytics.mxstbr.com/';
  var owa_cmds = owa_cmds || [];
  owa_cmds.push(['setSiteId', '203b56d88b1f6b6bcf90a257d663a44e']);
  owa_cmds.push(['trackPageView']);
  owa_cmds.push(['trackClicks']);
  owa_cmds.push(['trackDomStream']);
  (function() {
    var _owa = document.createElement('script'); _owa.type = 'text/javascript'; _owa.async = true;
    owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl );
    _owa.src = owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js';
    var _owa_s = document.getElementsByTagName('script')[0]; _owa_s.parentNode.insertBefore(_owa, _owa_s);
  }());
};

// Saves the content to localStorage and sets the new textarea value
function changeContent(evt) {
  localStorage.setItem('content', evt.target.value);
  textarea.value = evt.target.value;
}

// Tests if localStorage is supported, shamelessly stolen from Modernizr: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
function localStorageTest() {
  var test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
