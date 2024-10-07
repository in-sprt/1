// Sample portfolio data
const portfolioItems = [
    { id: 1, title: "Modern Living Room", category: "interior", image: "images/interior1.jpg" },
    { id: 2, title: "Brand Identity", category: "graphic", image: "images/graphic1.jpg" },
    { id: 3, title: "3D Product Visualization", category: "3d", image: "images/3d1.jpg" },
    { id: 4, title: "Minimalist Kitchen", category: "interior", image: "images/interior2.jpg" },
    { id: 5, title: "Logo Design", category: "graphic", image: "images/graphic2.jpg" },
    { id: 6, title: "Architectural Rendering", category: "3d", image: "images/3d2.jpg" },
    // Add more items as needed
];

// DOM elements
const portfolioGrid = document.querySelector('.portfolio-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const lightbox = document.getElementById('lightbox');
const lightboxInner = document.getElementById('lightbox-inner');
const closeLightbox = document.querySelector('.close-lightbox');

// Render portfolio items
function renderPortfolioItems(items) {
    portfolioGrid.innerHTML = '';
    items.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.classList.add('portfolio-item');
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-item-info">
                <h3 class="portfolio-item-title">${item.title}</h3>
                <p class="portfolio-item-category">${item.category}</p>
                <a href="#" class="view-project" data-id="${item.id}">View Project</a>
            </div>
        `;
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Filter portfolio items
function filterPortfolio(category) {
    const filteredItems = category === 'all' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === category);
    renderPortfolioItems(filteredItems);
}

// Event listeners for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterPortfolio(button.getAttribute('data-filter'));
    });
});

// Open lightbox
function openLightbox(id) {
    const item = portfolioItems.find(item => item.id === parseInt(id));
    if (item) {
        lightboxInner.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.image}" alt="${item.title}">
            <p>Category: ${item.category}</p>
            <p>Description: This is a placeholder description for the project. Replace with actual project details.</p>
        `;
        lightbox.style.display = 'block';
    }
}

// Close lightbox
function closeLightboxFunc() {
    lightbox.style.display = 'none';
}

// Event delegation for view project buttons
portfolioGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-project')) {
        e.preventDefault();
        openLightbox(e.target.getAttribute('data-id'));
    }
});

// Event listener for close lightbox button
closeLightbox.addEventListener('click', closeLight
