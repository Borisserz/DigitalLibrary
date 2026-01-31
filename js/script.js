const books = [
  { id: 1, title: 'Введение в алгоритмы', author: 'Т. Кормен', year: 2009, description: 'Основы алгоритмов и структур данных.' },
  { id: 2, title: 'Чистый код', author: 'Роберт Мартин', year: 2008, description: 'Практики разработки поддерживаемого кода.' },
  { id: 3, title: 'Современный JavaScript', author: 'Э. Фримен', year: 2020, description: 'Современные подходы к разработке на JavaScript.' },
  { id: 4, title: 'Базы данных', author: 'А. Сидоров', year: 2017, description: 'Реляционные и NoSQL базы данных.' }
];

function renderBooks(list){
  const container = document.getElementById('books');
  if(!container) return;
  if(list.length === 0){
    container.innerHTML = '<p>Ничего не найдено.</p>';
    return;
  }

  container.innerHTML = list.map(book => `
    <article class="book" data-id="${book.id}">
      <h3>${book.title}</h3>
      <p class="author">${book.author}</p>
      <p class="desc">${book.description}</p>
      <div class="meta">Год: ${book.year}</div>
      <button class="open">Подробнее</button>
    </article>
  `).join('');

  container.querySelectorAll('.open').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const b = list[idx];
      alert(`${b.title}\nАвтор: ${b.author}\nГод: ${b.year}\n\n${b.description}`);
    });
  });
}

// Поиск по названию и автору
const searchInput = document.getElementById('search');
if(searchInput){
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    renderBooks(books.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)));
  });
}

// Инициализация
renderBooks(books);
console.log('DigitalLibrary script loaded — books:', books.length);
