
// fetch data from the server
fetch("http://localhost:3000/services/test")
.then(response => response.json()) //get the json response that was sent 
.then(services_from_database => {
    console.log("services", services_from_database);
    displayServices(services_from_database);
});

function displayServices(serviceArray) {

    console.log("serviceArray", serviceArray);
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
    
    fetch(`http://localhost:3000/services?search=${query}`)
    .then(response => response.json()) //get the json response that was sent 
    .then(filteredServices => {
        console.log("filteredServices", filteredServices);
        displayServices(filteredServices);
    });
});