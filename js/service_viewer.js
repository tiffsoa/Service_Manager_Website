document.addEventListener("DOMContentLoaded", function() {
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
                <p><strong>Company:</strong> ${service.company}</p>
                <p><strong>Date:</strong> ${service.date}</p>
                <p><strong>Time:</strong> ${service.time}</p>
                <p><strong>Description:</strong> ${service.description}</p>
                <p><strong>Price:</strong> $${service.price}</p>
                <p><strong>Status:</strong> ${service.status}</p>
            </div>
        `;
    }

    // Function to cancel the service
    function cancelService(serviceId) {
        const confirmed = confirm("Are you sure you want to cancel this service?");
        if (confirmed) {
            fetch(`http://localhost:3000/services/${serviceId}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                alert("Service canceled successfully.");
                window.location.href = "customer_dashboard.html"; // Redirect to the dashboard
            })
            .catch(error => {
                console.error('Error canceling service:', error);
                alert("There was an error canceling the service.");
            });
        }
    }

    // Function to reschedule the service (open prompt to update date and time)
    function rescheduleService(serviceId) {
        const newDate = prompt("Enter the new date (e.g., 2024-10-30):");
        const newTime = prompt("Enter the new time (e.g., 10:00 AM - 11:00 AM):");

        if (newDate && newTime) {
            fetch(`http://localhost:3000/services/${serviceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: newDate,
                    time: newTime
                })
            })
            .then(response => response.json())
            .then(updatedService => {
                alert("Service has been rescheduled!");
                displayServiceDetails(updatedService); // Update the UI with the new details
            })
            .catch(error => {
                console.error('Error rescheduling service:', error);
                alert("There was an error rescheduling the service.");
            });
        }
    }

    // Fetch the service data based on the ID in the URL
    const serviceId = getServiceId();
    fetch(`http://localhost:3000/services/${serviceId}`)
        .then(response => response.json())
        .then(service => {
            if (service) {
                displayServiceDetails(service);
            } else {
                document.getElementById("serviceDetails").innerHTML = "<p>Service not found.</p>";
            }
        })
        .catch(error => {
            console.error('Error fetching service details:', error);
            document.getElementById("serviceDetails").innerHTML = "<p>There was an error fetching the service details.</p>";
        });

    // Handle reschedule action
    document.getElementById("rescheduleService").addEventListener("click", function() {
        rescheduleService(serviceId);
    });

    // Handle cancel service button event
    document.getElementById("cancelService").addEventListener("click", function() {
        cancelService(serviceId);
    });

    // Back to dashboard button
    document.getElementById("backButton").addEventListener("click", function() {
        window.location.href = "customer_dashboard.html";
    });
});
