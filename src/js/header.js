//* S W I T C H  T H E M E

let LightSwitcher = document.querySelector('.switcher');
let isLight = localStorage.getItem('isLight');

if (isLight === 'true') {
  document.body.classList.add('light');
}

LightSwitcher.onclick = function () {
  document.body.classList.toggle('light');
  isLight = document.body.classList.contains('light');
  localStorage.setItem('isLight', isLight);
};