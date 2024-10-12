// Sample portfolio data
const portfolioItems = [
    { id: 1, title: "Modern Living Room", category: "interior", image: "images/interior/1.jpg", description: "A sleek and contemporary living room design featuring clean lines and a neutral color palette." },
    { id: 2, title: "Minimalist Kitchen", category: "interior", image: "images/interior/2.jpg", description: "Efficient and stylish kitchen design maximizing space in a compact urban apartment." },
    { id: 3, title: "Minimalist Kitchen", category: "interior", image: "images/interior/3.jpg", description: "Efficient and stylish kitchen design maximizing space in a compact urban apartment." },
    { id: 4, title: "Minimalist Kitchen", category: "interior", image: "images/interior/4.jpg", description: "Efficient and stylish kitchen design maximizing space in a compact urban apartment." },
    { id: 5, title: "Brand Identity", category: "graphic", image: "images/graphic/1.jpg", description: "Comprehensive brand identity design including logo, color scheme, and typography for a tech startup." },
    { id: 6, title: "Logo Design", category: "graphic", image: "images/graphic/2.jpg", description: "Modern and versatile logo design for a sustainable fashion brand." },
    { id: 7, title: "Logo Design", category: "graphic", image: "images/graphic/3.jpg", description: "Modern and versatile logo design for a sustainable fashion brand." },
    { id: 8, title: "Logo Design", category: "graphic", image: "images/graphic/4.jpg", description: "Modern and versatile logo design for a sustainable fashion brand." },
    { id: 9, title: "3D Product Visualization", category: "ai", image: "images/ai/1.jpg", description: "Photorealistic 3D rendering of a new smartphone model for pre-launch marketing materials." },
    { id: 10, title: "Architectural Rendering", category: "ai", image: "images/ai/2.jpg", description: "Detailed 3D visualization of a contemporary office building showcasing innovative sustainable features." },
    { id: 11, title: "Architectural Rendering", category: "ai", image: "images/ai/3.jpg", description: "Detailed 3D visualization of a contemporary office building showcasing innovative sustainable features." },
    { id: 12, title: "Architectural Rendering", category: "ai", image: "images/ai/4.jpg", description: "Detailed 3D visualization of a contemporary office building showcasing innovative sustainable features." },
    // Add more items as needed
];

// DOM elements
const portfolioGrid = document.querySelector('.portfolio-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const lightbox = document.getElementById('lightbox');
const lightboxInner = document.getElementById('lightbox-inner');
const closeLightbox = document.querySelector('.close-lightbox');

// Render portfolio items with lazy loading
function renderPortfolioItems(items) {
    portfolioGrid.innerHTML = '';
    items.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.classList.add('portfolio-item');
        portfolioItem.innerHTML = `
            <img src="placeholder.jpg" data-src="${item.image}" alt="${item.title}" class="lazy-load">
            <div class="portfolio-item-info">
                <h3 class="portfolio-item-title">${item.title}</h3>
                <p class="portfolio-item-category">${item.category}</p>
                <a href="#" class="view-project" data-id="${item.id}">View Project</a>
            </div>
        `;
        portfolioGrid.appendChild(portfolioItem);
    });
    lazyLoadImages();
}

// Lazy loading for images
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img.lazy-load');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Filter portfolio items with animation
function filterPortfolio(category) {
    const filteredItems = category === 'all' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === category);
    
    // Fade out current items
    const currentItems = portfolioGrid.querySelectorAll('.portfolio-item');
    currentItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
    });

    // Render new items after a short delay
    setTimeout(() => {
        renderPortfolioItems(filteredItems);
        // Fade in new items
        const newItems = portfolioGrid.querySelectorAll('.portfolio-item');
        newItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 100);
        });
    }, 300);
}

// Event listeners for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterPortfolio(button.getAttribute('data-filter'));
    });
});

// Open lightbox with animation
function openLightbox(id) {
    const item = portfolioItems.find(item => item.id === parseInt(id));
    if (item) {
        lightboxInner.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.image}" alt="${item.title}">
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Description:</strong> ${item.description}</p>
        `;
        lightbox.style.display = 'block';
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 50);
    }
}

// Close lightbox with animation
function closeLightboxFunc() {
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300);
}

// Event delegation for view project buttons
portfolioGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-project')) {
        e.preventDefault();
        openLightbox(e.target.getAttribute('data-id'));
    }
});

// Event listener for close lightbox button
closeLightbox.addEventListener('click', closeLightboxFunc);

// Close lightbox when clicking outside the content
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxFunc();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightboxFunc();
    }
});

// Infinite scroll
let currentPage = 1;
const itemsPerPage = 6;

function loadMoreItems() {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newItems = portfolioItems.slice(startIndex, endIndex);

    if (newItems.length > 0) {
        renderPortfolioItems(newItems);
        currentPage++;
    }
}

// Intersection Observer for infinite scroll
const infiniteScroll = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMoreItems();
    }
});

// Add a sentinel element at the bottom of the grid
const sentinel = document.createElement('div');
sentinel.className = 'sentinel';
portfolioGrid.appendChild(sentinel);
infiniteScroll.observe(sentinel);

// Initial render
renderPortfolioItems(portfolioItems.slice(0, itemsPerPage));
