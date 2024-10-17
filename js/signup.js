
const password = document.getElementById('password');
const confirm_p = document.getElementById('confirmPassword');
const form = document.getElementById('form');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    let messages = [];

    if (password.value.length <= 8) {
        messages.push('Password must be longer than 8 characters.');
    }

    if (password.value.length >= 20) {
        messages.push('Password must be less than 20 characters.');
    }

    if (password.value != confirm_p.value) {
        messages.push('Passwords do not match. Please try again.')
    }

    if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerText = messages.join(', ');
    }
});