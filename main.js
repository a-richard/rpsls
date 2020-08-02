// Rules modal box
let rulesBox = document.querySelector('.rules-background');
let closeButton = document.querySelector('.close-icon');
let rulesButtons = document.querySelectorAll('.rules-button');

rulesButtons.forEach(function (button) {
  button.onclick = function () {
    rulesBox.style.display = 'block';
  };
});

closeButton.onclick = function () {
  rulesBox.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target === rulesBox) {
    rulesBox.style.display = 'none';
  }
};
