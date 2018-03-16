function getTrendingGIFs() {
  var search = document.getElementById('searchfield').value
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        buildHTMLfromResponse(request.responseText);
        document.getElementById('startScreen').style.display = 'none'
        new Bricklayer(document.querySelector('.bricklayer'));
      }
  };
  if(search.length <= 0)
    request.open("GET","http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC", true);
  else {
    request.open("GET","http://api.giphy.com/v1/gifs/search?q="+search+"&api_key=dc6zaTOxFJmzC", true);
  }
  request.send();
}

function buildHTMLfromResponse(response) {
  var responseHTML = "";
  var responseParsed = JSON.parse(response);
  var arraySize = responseParsed.data.length;
  removeChildrenElements(document.getElementById('bricklayer-container'));
  if(arraySize > 0){
    // Remove the Error-Screen
    var errorScreen = document.getElementById('errorScreen');
    errorScreen.style.display = 'none';
    for(var i = 0; i < arraySize; i++){
      // --- get information from response ---
      var src = responseParsed.data[i].images.preview_gif.url;
      var height = responseParsed.data[i].images.preview_gif.height;
      var widthFactor = responseParsed.data[i].images.preview_gif.width / (document.documentElement.clientWidth * 0.5);
      // --- Create necessary elements ---
      var divElem = document.createElement('div');
      var image = document.createElement('img');
      var buttonContainer = document.createElement('div');
      var downloadButton = document.createElement('div');
      var copyButton = document.createElement('div');
      // --- Add Style-Classes ---
      buttonContainer.classList.add('imageButtonContainer');
      image.classList.add("bricklayer-img");
      divElem.classList.add("bricklayer-container");
      downloadButton.classList.add("bricklayer-img-button");
      copyButton.classList.add("bricklayer-img-button");
      // --- Add IDs ---
      image.id = "giphy-image-" + i;
      downloadButton.id = "downloadButton-" + i;
      copyButton.id = "copyButton-" + i;
      buttonContainer.id = "buttonContainer-" + i;
      // --- Insert Content ---
      image.src = src;
      downloadButton.innerHTML = "<p> Save </p>";
      copyButton.innerHTML = "<p> Copy </p>";
      // --- Handle inline styles ---
      buttonContainer.style.opacity= 0;
      // --- Insert Elements into DOM-Tree ---
      divElem.appendChild(image);
      divElem.appendChild(buttonContainer);
      buttonContainer.appendChild(downloadButton);
      buttonContainer.appendChild(copyButton);
      document.getElementById('bricklayer-container').appendChild(divElem);
      // --- Add Event-Listeners ---
      image.addEventListener("mouseover", function(event){showImageButtons(event)});
      buttonContainer.addEventListener("mouseover", function(event){showImageButtons(event)});
      image.addEventListener("mouseout", function(event){hideImageButtons(event)});
      buttonContainer.addEventListener("mouseout", function(event){hideImageButtons(event)});
      downloadButton.addEventListener("click", function(event){downloadGif(event)});
      copyButton.addEventListener("click", function(event){copyGif(event)});
    }
  } else {
    // --- Show Error-Screen if no GIFs were found ---
    var errorScreen = document.getElementById('errorScreen');
    errorScreen.style.display = 'flex';
  }
}

function removeChildrenElements(parentElement) {
  parentElement.innerHTML = "";
}
