function initialize() {
  document.getElementById('searchfield').focus();
	document.getElementById('searchfield-button').addEventListener('click',getTrendingGIFs);
  document.getElementById('searchfield').addEventListener('keypress', function (e){addEnterKeyListener(e);})
}

function addEnterKeyListener(keyId) {
  var key = keyId.which || keyId.keyCode;
	if (key === 13) {
		keyId.preventDefault();
  	getTrendingGIFs();
	}
}
