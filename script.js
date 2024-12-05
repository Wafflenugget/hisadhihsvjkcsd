function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validate username length
    if (username.length < 6 || username.length > 9) {
        alert("Username must be between 6 and 9 letters.");
        return;
    }

    // Store user data in localStorage
    localStorage.setItem("currentUser", JSON.stringify({ username, password }));
    window.location.href = "home.html"; // Redirect to home page
}

function signOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "registration.html"; // Redirect to registration page
}

window.onload = function() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        const greeting = document.getElementById("greeting");
        greeting.innerText = `Hello ${currentUser.username}!`;
    } else {
        window.location.href = "registration.html"; // Redirect if not logged in
    }
};
