// API Base URL
const API_BASE = "http://localhost:3000";

// Data Stores
let adminProfile = {};
let services = [];
let customers = [];

// Utility Functions
async function fetchData(url, options = {}) {
    const response = await fetch(`${API_BASE}${url}`, options);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "An error occurred.");
    }
    return response.json();
}

// Admin Profile
async function loadAdminProfile() {
    try {
        adminProfile = await fetchData('/admin');
        updateAdminDetails();
    } catch (error) {
        console.error("Failed to load admin profile:", error.message);
    }
}

async function updateAdminProfile(event) {
    event.preventDefault();

    const adminName = document.getElementById('admin-name').value.trim();
    const adminLogo = document.getElementById('admin-logo').value.trim();
    const adminAddress = document.getElementById('admin-address').value.trim();
    const adminDescription = document.getElementById('admin-description').value.trim();

    try {
        await fetchData('/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: adminName,
                logo: adminLogo,
                address: adminAddress,
                description: adminDescription
            })
        });

        // Clear form fields
        document.getElementById('admin-name').value = '';
        document.getElementById('admin-logo').value = '';
        document.getElementById('admin-address').value = '';
        document.getElementById('admin-description').value = '';

        loadAdminProfile();
    } catch (error) {
        alert(`Failed to update admin profile: ${error.message}`);
    }
}

function updateAdminDetails() {
    const adminDetails = document.getElementById('admin-details');
    adminDetails.innerHTML = `
        <div>
            <img src="${adminProfile.logo}" alt="Admin Logo" width="100" height="100"><br>
            <strong>Name:</strong> ${adminProfile.name}<br>
            <strong>Address:</strong> ${adminProfile.address}<br>
            <strong>Description:</strong> ${adminProfile.description || 'No description provided.'}
        </div>
    `;
}

// Services
async function loadServices() {
    try {
        services = await fetchData('/services');
        updateOverview();
        updateServiceSelect();
    } catch (error) {
        console.error("Failed to load services:", error.message);
    }
}

async function addService(event) {
    event.preventDefault();

    const serviceName = document.getElementById('service-name').value.trim();
    const servicePrice = parseFloat(document.getElementById('service-price').value);
    const serviceDescription = document.getElementById('service-description').value.trim();

    try {
        await fetchData('/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: serviceName,
                price: servicePrice,
                description: serviceDescription
            })
        });

        // Clear form fields
        document.getElementById('service-name').value = '';
        document.getElementById('service-price').value = '';
        document.getElementById('service-description').value = '';

        loadServices();
    } catch (error) {
        alert(`Failed to add service: ${error.message}`);
    }
}

async function modifyService() {
    const selectedIndex = document.getElementById('service-select').value;
    const newPrice = parseFloat(document.getElementById('new-service-price').value);
    const newDescription = document.getElementById('new-service-description').value.trim();

    if (selectedIndex === "") {
        alert("Please select a service to modify.");
        return;
    }

    try {
        await fetchData(`/services/${selectedIndex}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                price: newPrice,
                description: newDescription
            })
        });

        // Clear form fields
        document.getElementById('new-service-price').value = '';
        document.getElementById('new-service-description').value = '';

        loadServices();
    } catch (error) {
        alert(`Failed to modify service: ${error.message}`);
    }
}

async function removeService(index) {
    try {
        await fetchData(`/services/${index}`, { method: 'DELETE' });
        loadServices();
    } catch (error) {
        alert(`Failed to remove service: ${error.message}`);
    }
}

function updateOverview() {
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = services.length
        ? services.map((service, index) => `
            <div>
                <strong>${service.name}</strong>: $${service.price}<br>
                <em>${service.description || 'No description provided.'}</em><br>
                <button onclick="removeService(${index})">Remove</button>
            </div>
        `).join('')
        : 'No services available.';
}

function updateServiceSelect() {
    const serviceSelect = document.getElementById('service-select');
    serviceSelect.innerHTML = '<option value="">Select a service</option>';
    services.forEach((service, index) => {
        serviceSelect.innerHTML += `<option value="${index}">${service.name}</option>`;
    });
}

// Customers
async function loadCustomers() {
    try {
        customers = await fetchData('/customers');
        updateClientList();
    } catch (error) {
        console.error("Failed to load customers:", error.message);
    }
}

async function followUp(index) {
    try {
        const response = await fetchData(`/customers/follow-up/${index}`, { method: 'POST' });
        alert(response.message);
    } catch (error) {
        alert(`Failed to follow up with customer: ${error.message}`);
    }
}

function updateClientList() {
    const clientList = document.getElementById('client-list');
    clientList.innerHTML = customers.length
        ? customers.map((customer, index) => `
            <div style="color: ${customer.unpaidAmount > 0 ? 'red' : 'black'}">
                ${customer.name} (${customer.email}) - Date of Service Booked: ${customer.serviceDate} - ${customer.unpaidAmount > 0 ? 'Unpaid: $' + customer.unpaidAmount : 'Paid'}
                ${customer.unpaidAmount > 0 ? `<button onclick="followUp(${index})">Follow Up</button>` : ''}
            </div>
        `).join('')
        : 'No clients available.';
}

// Event Listeners
document.getElementById('admin-form').addEventListener('submit', updateAdminProfile);
document.getElementById('service-form').addEventListener('submit', addService);
document.getElementById('modify-button').addEventListener('click', modifyService);
document.getElementById('service-select').addEventListener('change', function() {
    const modifySection = document.getElementById('modify-section');
    modifySection.style.display = this.value ? 'block' : 'none';
});

// Initialization
async function initialize() {
    await loadAdminProfile();
    await loadServices();
    await loadCustomers();
}

initialize();
