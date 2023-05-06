const menuButton = document.getElementById('menu-button');
const menu = document.querySelector('nav');
const overlay = document.getElementById('overlay');
const body = document.querySelector('body');

// відкриття мобільного меню
menuButton.addEventListener('click', () => {
  menu.style.left = '0';
  overlay.style.display = 'block';
  body.style.overflow = 'hidden';
});

// закриття мобільного меню по оверлею
overlay.addEventListener('click', () => {
  menu.style.left = '-64%';
  overlay.style.display = 'none';
  body.style.overflow = 'auto';
});