function filterServices(category) {
    const services = document.querySelectorAll('.service-card');
    const categoryTitle = document.getElementById('category-title');

    if (category === 'all') {
        categoryTitle.textContent = 'All Services';
    } else {
        categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1) + ' Services';
    }

    services.forEach((service) => {
        if (category === 'all' || service.getAttribute('data-category') === category) {
            service.style.display = 'block';
        } else {
            service.style.display = 'none';
        }
    });
}
