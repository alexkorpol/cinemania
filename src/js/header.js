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

//* C U R R E N T   P A G E

// Отримати URL поточної сторінки
var currentUrl = window.location.href;

// Отримати всі елементи посилань у списку
var navLinks = document.querySelectorAll('.header__nav-link, .mobile-menu__link');

// Пройтись по кожному елементу посилання
navLinks.forEach(function(link) {
  // Перевірити, чи співпадає URL посилання з поточним URL
  if (link.href === currentUrl) {
    // Додати клас до елементу посилання
    link.classList.add('link__current');
  }
});

// var currentPath = window.location.pathname;
// var navLinks = document.querySelectorAll('.header__nav-link, .mobile-menu__link');
// var homeLink = document.querySelector('.header__nav-link[href="./index.html"]');

// navLinks.forEach(function (link) {
//   if (link.getAttribute('href') === currentPath) {
//     link.classList.add('link__current');
//   }
// });

// if (currentPath === '/index.html') {
//   homeLink.classList.add('link__current');
// }

