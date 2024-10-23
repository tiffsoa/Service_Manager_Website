/* function filterServices(category) {
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
*/

const services = [
    { name: "House Cleaning", company: "AllHomia", description: "Cleaning and organizing homes"},
    { name: "Garden Maintenance", company: "AllHomia", description: "Making your garden look pretty and clean"},
    { name: "Plumbing", company: "AllHomia", description: "Fixing leaks and installing pipes"},
    { name: "Lawn Mowing", company: "AllHomia", description: "Maintening lawns and gardens"},
    { name: "Deep Cleaning", company: "AllHomia", description: "Cleaning every corner of your house"},
    { name: "Furniture Installation", company: "AllHomia", description: "Transporting and isntalling your furniture for you"},
];

function displayServices(serviceArray) {
    const container = document.getElementById('services-grid');
    container.innerHTML = '';

    serviceArray.forEach(service => {
        const card = `
            <div class="service-card">
                <h4>${service.name}</h4>
                <p>${service.description}</p>
                <h5>${service.company}</h5>
            </div>
        `;
        container.innerHTML += card;
    });
}

displayServices(services);