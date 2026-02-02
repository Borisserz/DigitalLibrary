document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');

  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        console.log('Поиск:', searchInput.value);
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      console.log('Поиск:', searchInput.value);
    });
  }
});

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.querySelector('.mobile-menu-btn');

  if (menu.style.display === 'block') {
    menu.style.display = 'none';
    btn.classList.remove('is-open');
  } else {
    menu.style.display = 'block';
    btn.classList.add('is-open');
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
