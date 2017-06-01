function downloadGif(event) {
  var button = event.currentTarget;
  var targetElement = document.getElementById(button.id.replace('downloadButton-','giphy-image-'));
  var origURL = targetElement.src.replace('-preview','');
  getImage(origURL, "gif.gif");
}

function getImage(url, filename){
  var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      console.log('[INFO]: content-type:', res.headers['content-type']);
      console.log('[INFO]: content-length:', res.headers['content-length']);
      showFooterInformation('download-info');
       if(!filename.includes(".gif")){
         filename += ".gif";
       }
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };
  dialog.showSaveDialog({defaultPath: 'giphyClipboard.gif'}, (fileName) => {
    if (fileName === undefined){
      console.log('[INFO]: The download was aborted');
      showFooterInformation('download-cancelled');
    } else {
      download(url, fileName,
        function(){
          showFooterInformation('download-success');
          console.log('[INFO]: Image was successfully saved under ' + fileName, '');
        });
    }
  });
}
