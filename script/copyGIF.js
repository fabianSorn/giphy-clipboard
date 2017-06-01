function copyGif(event) {
  var button = event.currentTarget;
  var targetElement = document.getElementById(button.id.replace('copyButton-','giphy-image-'));
  var origURL = targetElement.src.replace('-preview','');
  clipboard.writeText(origURL);
  showFooterInformation('copy-info');
}
