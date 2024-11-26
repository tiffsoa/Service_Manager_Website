const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  const lastName = document.getElementById("lastname").value.trim();
  const firstName = document.getElementById("firstname").value.trim();
  const phone = document.getElementById("phoneNumber").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const errorDiv = document.getElementById("error");

  if (password !== confirmPassword) {
    errorDiv.textContent = "Passwords do not match!";
    errorDiv.style.color = "red";
    return;
  }

  const formData = { lastName, firstName, phone, email, password };

  console.log("formDsata", formData);
  try {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Sign up successful!");
      window.location.replace("/signin_c.html"); // Redirect on success
    } else {
      errorDiv.textContent = data.error || "Sign up failed!";
      errorDiv.style.color = "red";
    }
  } catch (err) {
    console.error("Error submitting form:", err);
    errorDiv.textContent = "An unexpected error occurred.";
    errorDiv.style.color = "red";
  }
});
