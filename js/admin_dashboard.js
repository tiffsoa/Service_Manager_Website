// Service and Customer Data
const services = [];
const customers = [
    { name: "Alice Smith", email: "alice@example.com", unpaidAmount: 50 },
    { name: "Bob Johnson", email: "bob@example.com", unpaidAmount: 0 },
    { name: "Carol White", email: "carol@example.com", unpaidAmount: 75 },
];

// Function to update the services overview section
function updateOverview() {
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = services.length 
        ? services.map((service, index) => `
            <div>
                ${service.name}: $${service.price}
                <button onclick="removeService(${index})">Remove</button>
            </div>
        `).join('') 
        : 'No services available.';
}

// Function to update the service selection dropdown
function updateServiceSelect() {
    const serviceSelect = document.getElementById('service-select');
    serviceSelect.innerHTML = '<option value="">Select a service</option>';
    services.forEach((service, index) => {
        serviceSelect.innerHTML += `<option value="${index}">${service.name}</option>`;
    });
}

// Function to check for existing service names
function serviceExists(serviceName) {
    return services.some(service => service.name.toLowerCase() === serviceName.toLowerCase());
}

// Handle service addition
document.getElementById('service-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const serviceName = document.getElementById('service-name').value.trim();
    const servicePrice = document.getElementById('service-price').value;

    if (serviceExists(serviceName)) {
        alert('Service with the same name already exists. Please use a different name.');
        return;
    }

    services.push({ name: serviceName, price: parseFloat(servicePrice) });
    updateOverview();
    updateServiceSelect(); // Ensure the dropdown updates live
    document.getElementById('service-name').value = '';
    document.getElementById('service-price').value = '';
});

// Show or hide the modify section based on selection
document.getElementById('service-select').addEventListener('change', function() {
    const selectedIndex = this.value;
    const modifySection = document.getElementById('modify-section');

    if (selectedIndex !== "") {
        modifySection.style.display = 'block'; // Show the modify section
    } else {
        modifySection.style.display = 'none'; // Hide the modify section
    }
});

// Handle modification of a selected service
document.getElementById('modify-button').addEventListener('click', function() {
    const selectedIndex = document.getElementById('service-select').value;
    const newPrice = document.getElementById('new-service-price').value;

    if (selectedIndex === "") {
        alert('Please select a service to modify.');
        return;
    }

    services[selectedIndex].price = parseFloat(newPrice);
    updateOverview();
    updateServiceSelect(); // Ensure the dropdown updates live
    document.getElementById('new-service-price').value = ''; // Clear the new price input
});

// Function to remove a service
function removeService(index) {
    services.splice(index, 1);
    updateOverview();
    updateServiceSelect(); // Ensure the dropdown updates live
}

// Customer management logic
// Function to update the client list
function updateClientList() {
    const clientList = document.getElementById('client-list');
    clientList.innerHTML = customers.length 
        ? customers.map((customer, index) => `
            <div>
                ${customer.name} (${customer.email}) - ${customer.unpaidAmount > 0 ? 'Unpaid: $' + customer.unpaidAmount : 'Paid'}
                ${customer.unpaidAmount > 0 ? `<button onclick="followUp(${index})">Follow Up</button>` : ''}
            </div>
        `).join('')
        : 'No clients available.';
}

// Function to follow up with a client
function followUp(index) {
    const customer = customers[index];
    // For now, show an alert
    alert(`Following up with ${customer.name} at ${customer.email} regarding their unpaid bills of $${customer.unpaidAmount}.`);
}


// Initialize the dashboard
updateOverview();
updateServiceSelect();
updateClientList();
