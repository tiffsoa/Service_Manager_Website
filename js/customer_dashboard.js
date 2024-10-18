// customer_dashboard.js

// Sample array to simulate stored services
let services = [
    { id: 1, name: "Service A", date: "2024-10-20", time: "10:00 AM - 11:00 AM", description: "This is a detailed description of Service A.", status: "Upcoming" },
    { id: 2, name: "Service B", date: "2024-11-05", time: "11:00 AM - 12:00 PM", description: "This is a detailed description of Service B.", status: "Upcoming" },
    { id: 3, name: "Service C", date: "2024-09-15", time: "01:00 PM - 02:00 PM", description: "This is a detailed description of Service C.", status: "Past" },
    { id: 4, name: "Service D", date: "2024-09-25", time: "02:00 PM - 03:00 PM", description: "This is a detailed description of Service D.", status: "Past" },
    // Add more entries for testing
];

// State variables for infinite scrolling
let currentIndex = 0;
const servicesPerPage = 2; // Number of services to load at once

// Function to display services on the dashboard
function displayServices() {
    const serviceList = document.getElementById("serviceList");
    const loading = document.getElementById("loading");
    loading.style.display = "block"; // Show loading indicator

    // Load a limited number of services based on current index
    const newServices = services.slice(currentIndex, currentIndex + servicesPerPage);
    newServices.forEach(service => {
        const serviceDiv = document.createElement("div");
        serviceDiv.className = "service";
        serviceDiv.innerHTML = `
            <h3>${service.name}</h3>
            <p><strong>Date:</strong> ${service.date}</p>
            <p><strong>Time:</strong> ${service.time}</p>
            <p><strong>Description:</strong> ${service.description}</p>
            <p><strong>Status:</strong> ${service.status}</p>
            <button class="view-service" data-id="${service.id}">View Service</button>
        `;
        serviceList.appendChild(serviceDiv);
    });

    // Update the current index
    currentIndex += servicesPerPage;
    loading.style.display = "none"; // Hide loading indicator

    // Hide loading if all services have been loaded
    if (currentIndex >= services.length) {
        window.removeEventListener('scroll', handleScroll); // Remove scroll event listener
    }
}

// Initial display of services
displayServices();

// Function to handle sign out
document.getElementById("signOut").addEventListener("click", function() {
    alert("You have signed out successfully!");
    // Redirect to homepage
    window.location.href = "homepage.html";
});

// Function to handle update password
document.getElementById("updatePassword").addEventListener("click", function() {
        // Redirect to the password update page
        window.location.href = "password_update.html";
});

// Function to handle account deletion
document.getElementById("deleteAccount").addEventListener("click", function() {
    const confirmation = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmation) {
        // Here you can add logic to send a request to delete the account
        alert("Your account has been deleted successfully!");
        // Redirect to homepage
        window.location.href = "homepage.html"; 
    } else {
        alert("Account deletion canceled.");
    }
});

// Event delegation to handle view service button clicks
document.getElementById("serviceList").addEventListener("click", function(event) {
    if (event.target.classList.contains("view-service")) {
        const serviceId = event.target.getAttribute("data-id");
        window.location.href = `service_viewer.html?id=${serviceId}`; // Pass the service ID to the service page
    }
});
// Function to handle scrolling
function handleScroll() {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200; // Adjust threshold as needed
    if (nearBottom) {
        displayServices(); // Load more services when near bottom
    }
}
// Add scroll event listener
window.addEventListener('scroll', handleScroll);