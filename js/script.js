// Функция для открытия/закрытия мобильного меню
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');

  if (menu.style.display === 'block') {
    menu.style.display = 'none';
    icon.innerHTML =
      '<line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="18" y2="18"></line>';
  } else {
    menu.style.display = 'block';
    icon.innerHTML =
      '<line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line>';
  }
}

// Функция для плавной прокрутки наверх страницы
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Обработчик для поиска (при нажатии Enter в поле поиска)
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');

  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        // Здесь можно добавить логику поиска
        console.log('Поиск:', searchInput.value);
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      // Здесь можно добавить логику поиска
      console.log('Поиск:', searchInput.value);
    });
  }
});
