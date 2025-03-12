const emailError = document.getElementById("email-error");
const customerEmail = localStorage.getItem("customerEmail");
const selectedServiceId = localStorage.getItem("selectedServiceId");
document
  .getElementById("booking-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); //to stop default form behaviour like reloading the page

    //take the form inputs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const tel = document.getElementById("tel").value;
    const message = document.getElementById("message").value;
    const frequency = document.getElementById("frequency").value;
    const serviceDate = document.getElementById("serviceDate").value;
    const comments = document.getElementById("comments").value;
    const payment = document.querySelector(
      'input[name="payment"]:checked'
    ).value;

    console.log("customer emial", customerEmail);
    if (email !== customerEmail) {
      emailError.style.display = "block";
      return;
    } else {
      emailError.style.display = "none";
    }

    const bookingData = {
      // customerId: 1, // how do we dynamically change the customerId
      name,
      email: customerEmail,
      phoneNumber: tel,
      address: message,
      frequency,
      serviceDate,
      comments,
      payment,
      terms: true,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/bookings/${selectedServiceId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save booking");
      }

      const booking = await response.json();
      console.log("booking", booking);

      //display confirmation with form input values
      document.getElementById("confirmName").textContent = `Name: ${name}`;
      document.getElementById("confirmEmail").textContent = `Email: ${email}`;
      document.getElementById("confirmTel").textContent = `Phone: ${tel}`;
      document.getElementById(
        "confirmMessage"
      ).textContent = `Address: ${message}`;
      document.getElementById(
        "confirmFrequency"
      ).textContent = `Frequency: ${frequency}`;
      document.getElementById(
        "confirmServiceDate"
      ).textContent = `Service Date: ${serviceDate}`;
      document.getElementById(
        "confirmComments"
      ).textContent = `Comments: ${comments}`;
      document.getElementById(
        "confirmPayment"
      ).textContent = `Payment by: ${payment}`;

      //show the confirmation section and hide the form
      document.getElementById("booking-form").style.display = "none";
      document.getElementById("confirmation").style.display = "block";
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing your booking.");
    }
  });

function resetForm() {
  //button that hides the confirmation section and returns to the form
  document.getElementById("confirmation").style.display = "none";
  document.getElementById("booking-form").style.display = "block";
  document.getElementById("booking-form").reset();
}

document.addEventListener("DOMContentLoaded", function () {
  const requestedService = document.querySelector("#manage-services h2");
  const selectedService = localStorage.getItem("selectedService");
  if (selectedService) {
    requestedService.textContent = `Requested Service: ${selectedService}`;
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
