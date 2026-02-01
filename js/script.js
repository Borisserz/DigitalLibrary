// Глобальный обработчик ошибок загрузки изображений
const FALLBACK_IMAGE =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4K';

document.addEventListener('DOMContentLoaded', function () {
  // Обработка битых картинок
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.addEventListener('error', function () {
      this.src = FALLBACK_IMAGE;
    });
  });

  // Логика поиска
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

// Функция для переключения мобильного меню (через классы)
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.querySelector('.mobile-menu-btn');

  // Переключаем видимость меню
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
    btn.classList.remove('is-open');
  } else {
    menu.style.display = 'block';
    btn.classList.add('is-open');
  }
}

// Функция для плавной прокрутки наверх страницы
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
