const customerId = localStorage.getItem("customerId");
console.log(customerId);
// Function to get the logged-in customer ID from the session
/* async function getCustomerId() {
  try {
    const response = await fetch("http://localhost:3000/session/customer", {
      method: "GET",
      credentials: "include", // Ensure session cookies are included
    });

    const data = await response.json();
    if (data.customerId) {
      return data.customerId; // Return the customer ID from the session
    } else {
      alert("You are not logged in!");
      window.location.replace("signin_c.html"); // Redirect to login page if no customer ID
      return null;
    }
  } catch (error) {
    console.error("Error fetching customer session:", error);
    window.location.replace("signin_c.html"); // Redirect to login page on error
    return null;
  }
} */

// Function to check if the customer is logged in
/* async function validateCustomerSession() {
  try {
    const response = await fetch("http://localhost:3000/session/customer", {
      method: "GET",
      credentials: "include", // Ensure session cookies are included
    });

    if (response.ok) {
      return true; // Session is valid
    } else {
      alert("You are not logged in!");
      window.location.replace("signin_c.html"); // Redirect to login page
      return false;
    }
  } catch (error) {
    console.error("Error validating customer session:", error);
    window.location.replace("signin_c.html"); // Redirect on error
    return false;
  }
} */

// Function to fetch customer services from the backend
async function fetchCustomerServices(customerId) {
  try {
    const response = await fetch(
      `http://localhost:3000/customer/services/${customerId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const services = await response.json();

    if (Array.isArray(services) && services.length > 0) {
      displayServices(services);
    } else {
      displayNoServicesMessage();
    }
  } catch (error) {
    console.error("Error fetching customer services:", error);
  }
}

// Function to fetch customer invoices from the backend
async function fetchCustomerInvoices(customerId) {
  try {
    const response = await fetch(
      `http://localhost:3000/customer/invoices/${customerId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const invoices = await response.json();

    if (Array.isArray(invoices) && invoices.length > 0) {
      displayInvoices(invoices);
    } else {
      displayNoInvoicesMessage();
    }
  } catch (error) {
    console.error("Error fetching customer invoices:", error);
  }
}

// Function to display services on the dashboard
function displayServices(services) {
  const serviceList = document.getElementById("serviceList");
  const loading = document.getElementById("loading");

  loading.style.display = "none"; // Hide loading indicator

  services.forEach((serviceObject) => {
    const service = serviceObject.serviceDetails; // Access serviceDetails
    const serviceDiv = document.createElement("div");
    serviceDiv.className = "service";
    serviceDiv.innerHTML = `
        <h3>${service.name}</h3>
        <p><strong>Id:</strong> ${service.id}</p>
        <p><strong>Description:</strong> ${service.description}</p>
        <p><strong>Price:</strong> ${service.price}</p>
      `;
    serviceList.appendChild(serviceDiv);
  });
}

// Function to display invoices on the dashboard
function displayInvoices(invoices) {
  const invoiceList = document.getElementById("invoiceList");
  const loadingInvoices = document.getElementById("loadingInvoices");

  loadingInvoices.style.display = "none"; // Hide loading indicator for invoices

  invoices.forEach((invoice) => {
    const invoiceDiv = document.createElement("div");
    invoiceDiv.className = "invoice";
    invoiceDiv.innerHTML = `
            <h3>Invoice #${invoice.id}</h3>
            <p><strong>Service ID:</strong> ${invoice.serviceId}</p>
            <p><strong>Amount:</strong> $${invoice.amount}</p>
            <p><strong>Status:</strong> ${invoice.status}</p>
            <p><strong>Due Date:</strong> ${invoice.dueDate}</p>
        `;
    invoiceList.appendChild(invoiceDiv);
  });
}

// Function to display a message when no services are available
function displayNoServicesMessage() {
  const serviceList = document.getElementById("serviceList");
  serviceList.innerHTML = "<p>You have no services booked yet.</p>";
}

// Function to display a message when no invoices are available
function displayNoInvoicesMessage() {
  const invoiceList = document.getElementById("invoiceList");
  invoiceList.innerHTML = "<p>You have no invoices available.</p>";
}

// Function to handle sign out
document.getElementById("signOut").addEventListener("click", function () {
  alert("You have signed out successfully!");
  localStorage.removeItem("userRole");
  localStorage.removeItem("customerId");
  window.location.replace("homepage.html"); // Redirect to homepage
});

// Function to handle update password
document
  .getElementById("updatePassword")
  .addEventListener("click", function () {
    window.location.replace("password_update.html"); // Redirect to password update page
  });

// Function to handle account deletion
document.getElementById("deleteAccount").addEventListener("click", function () {
  const confirmation = confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );
  if (confirmation) {
    deleteAccount(customerId); // Call the function to delete the account
  } else {
    alert("Account deletion canceled.");
  }
});

// Function to handle account deletion
async function deleteAccount() {
  try {
    const response = await fetch(
      `http://localhost:3000/customer/${customerId}`,
      {
        method: "DELETE",
        credentials: "include", // Send session cookies
      }
    );

    if (response.ok) {
      localStorage.removeItem("userRole");
      localStorage.removeItem("customerId");
      alert("Your account has been deleted successfully!");
      window.location.replace("homepage.html"); // Redirect to homepage
    } else {
      alert("Failed to delete account.");
    }
  } catch (error) {
    console.error("Error deleting account:", error);
  }
}

// Load customer services and invoices on page load
document.addEventListener("DOMContentLoaded", async () => {
  /* const customerId = await getCustomerId(); // Get the customer ID from session */
  if (customerId) {
    fetchCustomerServices(customerId);
    fetchCustomerInvoices(customerId);
  }
});

document
  .querySelector(".topnav .active")
  .addEventListener("click", function () {
    const userRole = localStorage.getItem("userRole");

    if (userRole === "customer") {
      window.location.href = "customer_dashboard.html";
    } else if (userRole === "admin") {
      window.location.href = "admin_dashboard.html";
    } else {
      alert("Please sign in first");
      window.location.href = "login.html"; // Redirect to sign-in page
    }
  });
