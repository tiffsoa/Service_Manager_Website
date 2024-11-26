const customerId = localStorage.getItem("customerId");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const currentPasswordInput = document.getElementById("current-password");
  const newPasswordInput = document.getElementById("new-password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const errorDiv = document.getElementById("error");
  const successDiv = document.getElementById("success");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Clear previous error and success messages
    errorDiv.textContent = "";
    successDiv.textContent = "";

    // Get form values
    const currentPassword = currentPasswordInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Validate passwords
    if (!validatePassword(newPassword)) {
      errorDiv.textContent =
        "New password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
      errorDiv.style.color = "red";
      return;
    }

    // Check if new password and confirmation password match
    if (newPassword !== confirmPassword) {
      errorDiv.textContent = "New password and confirmation do not match.";
      errorDiv.style.color = "red";
      return;
    }

    // Call the backend API to update the password
    updatePassword(customerId, currentPassword, newPassword, confirmPassword);
  });

  // Function to validate password complexity
  function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  // Function to get the customer ID from session (or use a different method)
  function getCustomerIdFromSession() {
    return 1;
  }

  // Function to call backend API to update the password
  function updatePassword(
    customerId,
    currentPassword,
    newPassword,
    confirmPassword
  ) {
    // Prepare the request payload
    const payload = {
      customerId: customerId,
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    // Send POST request to the backend API
    fetch(`http://localhost:3000/update-password/${customerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          // On success, display the success message
          successDiv.textContent = data.message;
          successDiv.style.color = "green";
        } else if (data.error) {
          // On error, display the error message
          errorDiv.textContent = data.error;
          errorDiv.style.color = "red";
        }
      })
      .catch((error) => {
        // Handle unexpected errors
        console.error("Error:", error);
        errorDiv.textContent = "An error occurred while updating the password.";
        errorDiv.style.color = "red";
      });
  }
});
