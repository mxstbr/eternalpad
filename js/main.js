var textarea;
var localforage = require('localforage');

window.onload = function() {
  // Get textarea and test for localStorage support
  textarea = document.querySelector('.textarea');

  // Set the initial Content to the previously saved one, or to the default one
  localforage.getItem('content', function(err, value) {
    if (err) {
      textarea.value = "Sorry, your browser is not supported by Eternalpad. Switch to a modern browser to get full functionality.";
    } else {
      textarea.value = value || 'Welcome to Eternalpad.\n\nWrite something here, then refresh the page.\nYour note will still be here, waiting for you.\n\nEternalpad is perfect for jotting down shopping lists, phone numbers, license plates, etc.\nNever search for a pen or for that one specific note again.';
      // Save the text onkeyup and onblur
      textarea.onkeyup = changeContent;
      textarea.onblur = changeContent;
      // Focus textarea to open virtual keyboards on touch devices
      textarea.focus();
    }
  });
};

// Saves the content to localStorage and sets the new textarea value
function changeContent(evt) {
  localforage.setItem('content', evt.target.value);
  textarea.value = evt.target.value;
}
