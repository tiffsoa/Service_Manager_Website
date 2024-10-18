document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const errorDiv = document.getElementById('error');

    form.addEventListener('submit', function (e) {
        // Clear previous error messages
        errorDiv.textContent = '';

        // Validate passwords
        const currentPassword = currentPasswordInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Check if the new password meets the requirements
        if (!validatePassword(newPassword)) {
            e.preventDefault();
            errorDiv.textContent = 'New password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.';
            errorDiv.style.color = 'red';
            return;
        }

        // Check if new password and confirmation password match
        if (newPassword !== confirmPassword) {
            e.preventDefault();
            errorDiv.textContent = 'New password and confirmation do not match.';
            errorDiv.style.color = 'red';
        }
    });

    // Function to validate password complexity
    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    }
});
