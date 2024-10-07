//  Фильтр портфолио
const filterButtons = document.querySelectorAll('.filter button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    portfolioItems.forEach(item => {
      if (category === 'all' || item.classList.contains(category)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

//  Добавление работ в портфолио (динамически)
const portfolioGrid = document.querySelector('.portfolio-grid');

const projects = [
  //  Данные о проектах (название, категория, изображение, описание)
];

projects.forEach(project => {
  const item = document.createElement('div');
  item.classList.add('portfolio-item', project.category);
  item.innerHTML = `
    <img src="${project.image}" alt="${project.title}">
    <div class="portfolio-info">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </div>
  `;
  portfolioGrid.appendChild(item);
});
