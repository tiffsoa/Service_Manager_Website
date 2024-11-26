const userRole = localStorage.getItem('userRole');
if (!userRole) {
    alert('Please sign in first');
    window.location.href = 'homepage.html';
}


// fetch data from the server
fetch("http://localhost:3000/services", {
    method: "GET",
    credentials: "include",
})
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
                <button class="book-now" data-service-id="${service.id}">Book Now</button>
            </div>
        `;
        container.innerHTML += card;
    });

    //after generating the buttons, we collect all buttons with the .book-now class using the following function, and loop through each button and attach a click event listener.
    const bookButtons = document.querySelectorAll('.book-now');
    bookButtons.forEach(button => {
        button.addEventListener("click", function() {
            const serviceName = button.parentElement.querySelector('h4').textContent;
            const serviceId = button.getAttribute('data-service-id');
            localStorage.setItem('selectedServiceId', serviceId);
            alert("This action will take you to the booking and payment page.");
            window.location.replace("booking.html");
        });
    });
}

const searchInput = document.getElementById('search'); 
const servicesGrid = document.getElementById('services-grid');

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    
    fetch(`http://localhost:3000/services?search=${query}`, {
        method: "GET",
        credentials: "include",
    })
    .then(response => response.json()) //get the json response that was sent 
    .then(filteredServices => {
        console.log("filteredServices", filteredServices);
        displayServices(filteredServices);
    });
});


document.querySelector('.topnav a[href="customer_dashboard.html"]').addEventListener('click', function(event) {
    const userRole = localStorage.getItem('userRole');
    
    if (userRole === 'customer') {
        window.location.href = 'customer_dashboard.html';
    } else if (userRole === 'company') {
        window.location.href = 'admin_dashboard.html';
    } else {
        alert('Please sign in first');
        window.location.href = 'login.html';  // Redirect to sign-in page
        event.preventDefault(); // Prevent default behavior to avoid unwanted navigation
    }
});


// Dynamically update the profile link based on the role
const profileLink = document.querySelector('.topnav a[href="customer_dashboard.html"]');
if (userRole === 'customer') {
    profileLink.setAttribute('href', 'customer_dashboard.html');
} else if (userRole === 'company') {
    profileLink.setAttribute('href', 'admin_dashboard.html');
} else {
    profileLink.setAttribute('href', 'login.html');
}