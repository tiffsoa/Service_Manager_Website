const form = document.getElementById('form');
const errorElement = document.getElementById('error');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission
    const messages = [];
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    if (messages.length > 0) {
        errorElement.innerText = messages.join(', ');
        return; // Exit early if validation fails
    }

    // Send form data to the backend using fetch
    try {
        const response = await fetch("http://localhost:3000/signin/customer", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            alert("Sign in successful!");
            window.location.replace('/services.html'); // Redirect to services page
        } else {
            errorElement.textContent = data.error || "Sign in failed!";
        }
    } catch (error) {
        console.error("Error submitting form:", err);
        errorElement.textContent = "An unexpected error occured.";
    }
});
