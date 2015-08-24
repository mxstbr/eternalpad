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
