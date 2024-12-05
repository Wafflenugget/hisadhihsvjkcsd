document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    // Registration form submission
    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username.length < 6 || username.length > 9 || !password) {
            errorMessage.textContent = "Please enter a valid username (6-9 letters) and password.";
            return;
        }

        // Save the username in localStorage and redirect
        localStorage.setItem('username', username);
        window.location.href = 'index.html'; // Redirect to homepage (set this to your homepage URL)
    });
});
