// Sample Customer ID (this would come from session or authentication in practice)
const customerId = 1;

// Function to fetch customer services from the backend
async function fetchCustomerServices() {
    try {
        const response = await fetch(`http://localhost:3000/customer/${customerId}/services`);
        const services = await response.json();

        if (Array.isArray(services) && services.length > 0) {
            displayServices(services);
        } else {
            displayNoServicesMessage();
        }
    } catch (error) {
        console.error('Error fetching customer services:', error);
    }
}

// Function to display services on the dashboard
function displayServices(services) {
    const serviceList = document.getElementById("serviceList");
    const loading = document.getElementById("loading");

    loading.style.display = "none"; // Hide loading indicator

    services.forEach(service => {
        const serviceDiv = document.createElement("div");
        serviceDiv.className = "service";
        serviceDiv.innerHTML = `
            <h3>${service.name}</h3>
            <p><strong>Company:</strong> ${service.company}</p>
            <p><strong>Date:</strong> ${service.date}</p>
            <p><strong>Time:</strong> ${service.time}</p>
            <p><strong>Description:</strong> ${service.description}</p>
            <p><strong>Status:</strong> ${service.status}</p>
        `;
        serviceList.appendChild(serviceDiv);
    });
}

// Function to display a message when no services are available
function displayNoServicesMessage() {
    const serviceList = document.getElementById("serviceList");
    serviceList.innerHTML = '<p>You have no services booked yet.</p>';
}

// Function to handle sign out
document.getElementById("signOut").addEventListener("click", function() {
    alert("You have signed out successfully!");
    window.location.href = "homepage.html"; // Redirect to homepage
});

// Function to handle update password
document.getElementById("updatePassword").addEventListener("click", function() {
    window.location.href = "password_update.html"; // Redirect to password update page
});

// Function to handle account deletion
document.getElementById("deleteAccount").addEventListener("click", function() {
    const confirmation = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmation) {
        deleteAccount(customerId); // Call the function to delete the account
    } else {
        alert("Account deletion canceled.");
    }
});

// Function to delete a customer account
async function deleteAccount(customerId) {
    try {
        const response = await fetch(`http://localhost:3000/customer/${customerId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert("Your account has been deleted successfully!");
            window.location.href = "homepage.html"; // Redirect to homepage
        } else {
            alert("Failed to delete account.");
        }
    } catch (error) {
        console.error('Error deleting account:', error);
    }
}

// Load customer services on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchCustomerServices();
});
