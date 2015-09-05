var textarea;
var localforage = require('localforage');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
} else {
  console.log('No ServiceWorker support :-(');
}

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
    }
    // Move caret to end of textarea, taken from http://davidwalsh.name/caret-end
    if (typeof textarea.selectionStart == "number") {
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
    } else if (typeof textarea.createTextRange != "undefined") {
      textarea.focus();
      var range = textarea.createTextRange();
      range.collapse(false);
      range.select();
    }
  });
};

// Saves the content to localStorage and sets the new textarea value
function changeContent(evt) {
  localforage.setItem('content', evt.target.value);
  textarea.value = evt.target.value;
}
