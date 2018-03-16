const electron = require('electron')

exports.navigationSide;
exports.menuButton;
exports.test = '42'

exports.initializeNavigation = function() {
  console.log('42')
  navigationSide = document.getElementById('navigation_header');
  menuButton = document.getElementById('menuButton');
}

exports.openNav = function() {
  initializeNavigation();
  document.getElementById('menuButton_icon').innerHTML='<i class="material-icons">arrow_back</i>';
  $('#navigation_header').show("fast");
  addNavCloseEventListener();
}

exports.addNavOpenEventListener = function() {
  initializeNavigation();
  menuButton.addEventListener("click", openNav);
  menuButton.removeEventListener("click", closeNav);
}

exports.closeNav = function() {
  initializeNavigation();
  document.getElementById('menuButton_icon').innerHTML='<i class="material-icons">menu</i>';
  $('#navigation_header').hide("fast");
  addNavOpenEventListener();
}

exports.addNavCloseEventListener = function() {
  initializeNavigation();
  menuButton.addEventListener("click", closeNav);
  menuButton.removeEventListener("click", openNav);
}
