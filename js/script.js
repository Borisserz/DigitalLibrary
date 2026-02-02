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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
