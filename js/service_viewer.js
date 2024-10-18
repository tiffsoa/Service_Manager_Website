// service_viewer.js

// Sample array of services
const services = [
    { id: 1, name: "Service A", date: "2024-10-20", time: "10:00 AM - 11:00 AM", description: "This is a detailed description of Service A.", status: "Upcoming" },
    { id: 2, name: "Service B", date: "2024-11-05", time: "11:00 AM - 12:00 PM", description: "This is a detailed description of Service B.", status: "Upcoming" },
    { id: 3, name: "Service C", date: "2024-09-15", time: "01:00 PM - 02:00 PM", description: "This is a detailed description of Service C.", status: "Past" },
    { id: 4, name: "Service D", date: "2024-09-25", time: "02:00 PM - 03:00 PM", description: "This is a detailed description of Service D.", status: "Past" },
    // Add more entries as needed
];

// Function to get the service ID from the URL
function getServiceId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10); // Get the service ID from the URL
}

// Function to display service details
function displayServiceDetails(service) {
    const serviceDetails = document.getElementById("serviceDetails");
    serviceDetails.innerHTML = `
        <div class="service">
            <h2>${service.name}</h2>
            <p><strong>Date:</strong> ${service.date}</p>
            <p><strong>Time:</strong> ${service.time}</p>
            <p><strong>Description:</strong> ${service.description}</p>
            <p><strong>Status:</strong> ${service.status}</p>
        </div>
    `;
}

// Function to handle rescheduling service
document.getElementById("rescheduleService").addEventListener("click", function() {
    alert("Service has been rescheduled!"); // Replace with actual rescheduling logic
});


// Function to handle canceling the service
function cancelService(serviceId) {
    const confirmed = confirm("Are you sure you want to cancel this service?");
    if (confirmed) {
        // Simulate removing the service from the array (in practice, you would also handle this on the server)
        const serviceIndex = services.findIndex(service => service.id === serviceId);
        if (serviceIndex > -1) {
            services.splice(serviceIndex, 1); // Remove the service from the array
            alert("Service canceled successfully.");
            window.location.href = "customer_dashboard.html"; // Redirect to the dashboard after cancellation
        }
    }
}

// Get the service ID and display its details
const serviceId = getServiceId();
const service = services.find(service => service.id === serviceId);
if (service) {
    displayServiceDetails(service);
} else {
    document.getElementById("serviceDetails").innerHTML = "<p>Service not found.</p>";
}
// Handle sign out action
document.getElementById("backButton").addEventListener("click", function() {
    window.location.href = "customer_dashboard.html";
});
// Cancel service button event
document.getElementById("cancelService").addEventListener("click", function() {
    cancelService(serviceId);
});
