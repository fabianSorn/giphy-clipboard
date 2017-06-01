// ================================================================================================
//  Imports and Variables
// ================================================================================================

const clipboard = require('electron').clipboard
const nativeImage = require('electron').nativeImage
var Buffer = require('buffer/').Buffer
var request = require('request');
var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');

// ================================================================================================
//  Download and Copy Button of GIF - Elements
// ================================================================================================

function showImageButtons(event) {
  var image = event.currentTarget;
  var imageButtonContainer = document.getElementById(image.id.replace('giphy-image-', 'buttonContainer-'));
  imageButtonContainer.style.opacity = 1;
}

function hideImageButtons(event) {
  var image = event.currentTarget;
  var imageButtonContainer = document.getElementById(image.id.replace('giphy-image-', 'buttonContainer-'));
  imageButtonContainer.style.opacity = 0;
}

// ================================================================================================
//  Footer shows and hides
// ================================================================================================

function showFooterInformation(elementID) {
  document.getElementById(elementID).style.display = 'inline';
  setTimeout(function () {
        document.getElementById(elementID).style.display = 'none';
    }, 5000);
}
