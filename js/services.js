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
    { name: "House Cleaning", company: "AllHomia", description: "Cleaning and organizing homes", price: 90},
    { name: "Garden Maintenance", company: "AllHomia", description: "Making your garden look pretty and clean", price: 150},
    { name: "Plumbing", company: "AllHomia", description: "Fixing leaks and installing pipes", price: 60},
    { name: "Lawn Mowing", company: "AllHomia", description: "Maintening lawns and gardens", price: 50},
    { name: "Deep Cleaning", company: "AllHomia", description: "Cleaning every corner of your house", price: 140},
    { name: "Furniture Installation", company: "AllHomia", description: "Transporting and isntalling your furniture for you", price: 100},
];

function displayServices(serviceArray) {
    const container = document.getElementById('services-grid');
    container.innerHTML = '';

    serviceArray.forEach(service => {
        const card = `
            <div class="service-card">
                <h4>${service.name}</h4>
                <p>${service.description}</p>
                <div class="prices"> $${service.price} </div>
                <button class="book-now">Book Now</button>
            </div>
        `;
        container.innerHTML += card;
    });

    //after generating the buttons, we collect all buttons with the .book-now class using the following function, and loop through each button and attach a click event listener.
    const bookButtons = document.querySelectorAll('.book-now');
    bookButtons.forEach(button => {
        button.addEventListener("click", function() {
            const serviceName = button.parentElement.querySelector('h4').textContent;
            localStorage.setItem('selectedService', serviceName);
            alert("This action will take you to the booking and payment page.");
            window.location.href = "booking.html";
        });
    });
}

const searchInput = document.getElementById('search'); 
const servicesGrid = document.getElementById('services-grid');

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(query)
    );
    displayServices(filteredServices);
});

displayServices(services);