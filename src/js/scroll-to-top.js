function hasScrollBehavior() {
  return 'scrollBehavior' in document.documentElement.style;
}

function smoothScroll() {
  let currentY = window.scrollY;
  const scrollInterval = setInterval(() => {
    window.scrollTo(0, currentY);

    if (currentY > 500) {
      currentY -= 70;
    } else if (currentY > 100) {
      currentY -= 50;
    } else {
      currentY -= 10;
    }

    if (currentY <= 0) {
      clearInterval(scrollInterval);
    }
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
  const y = window.scrollY;
  const e = document.getElementById('scroll-to-top');
  if (y >= 200) {
    e.style.transform = 'translateY(-30%)';
    e.style.opacity = '1';
  } else {
    e.style.opacity = '0';
    e.style.transform = 'translateY(30%)';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.removeEventListener('DOMContentLoaded', arguments.callee, false);

  window.addEventListener('scroll', toggleScrollUpButton);

  const e = document.getElementById('scroll-to-top');
  e.addEventListener('click', scrollToTop, false);
});
