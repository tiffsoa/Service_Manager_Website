let companyName = "EcoCleaners";


function updateCompanyName(name) {
    const elements = document.querySelectorAll(".company");
    elements.forEach(element => {
        element.innerText = name;
    });
}

updateCompanyName(companyName);

window.onload = function() {
    const customerLink = document.querySelector("a[href='./signin_c.html']");
    const userRole = localStorage.getItem('userRole');  // Assuming the user role is stored in localStorage

    // Check if the user is logged in and is a customer
    if (userRole === 'customer') {
        customerLink.href = './customer_dashboard.html';  // Redirect to customer dashboard if logged in as a customer
    } else {
        customerLink.href = './signin_c.html';  // Otherwise, show the sign-in page
    }
};

window.onload = function() {
    const customerLink = document.querySelector("a[href='./signin_b.html']");
    const userRole = localStorage.getItem('userRole');  // Assuming the user role is stored in localStorage

    // Check if the user is logged in and is a customer
    if (userRole === 'company') {
        customerLink.href = './admin_dashboard.html';  // Redirect to customer dashboard if logged in as a customer
    } else {
        customerLink.href = './signin_b.html';  // Otherwise, show the sign-in page
    }
};