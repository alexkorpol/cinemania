function hasScrollBehavior() {
  return 'scrollBehavior' in document.documentElement.style;
}

function smoothScroll() {
  var currentY = window.scrollY;
  var int = setInterval(function () {
    window.scrollTo(0, currentY);

    if (currentY > 500) {
      currentY -= 70;
    } else if (currentY > 100) {
      currentY -= 50;
    } else {
      currentY -= 10;
    }

    if (currentY <= 0) clearInterval(int);
  }, 1000 / 60); // Змінено на 60fps
}

function scrollToTop() {
  if (hasScrollBehavior()) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    smoothScroll();
  }
}

function toggleScrollUpButton() {
  var y = window.scrollY;
  var e = document.getElementById('scroll-to-top');
  if (y >= 200) {
    e.style.transform = 'translateY(-30%)';
    e.style.opacity = '1'; // Додано лапки для значення
  } else {
    e.style.opacity = '0'; // Додано лапки для значення
    e.style.transform = 'translateY(30%)';
  }
}

document.addEventListener(
  'DOMContentLoaded',
  function () {
    window.removeEventListener('DOMContentLoaded', arguments.callee, false); // Змінено на window.removeEventListener

    window.addEventListener('scroll', toggleScrollUpButton);

    var e = document.getElementById('scroll-to-top');
    e.addEventListener('click', scrollToTop, false);
  },
  false
);
