function togglePassword() {
    var passwordField = document.getElementById("password");
    var passwordIcon = document.querySelector('.input-container img[alt="Password Icon"]');
    if (passwordField.type === "password") {
        passwordField.type = "text";
        passwordIcon.src = "img/show.png"; // Change icon to "hide"
    } else {
        passwordField.type = "password";
        passwordIcon.src = "img/close.png"; // Change icon back to "show"
    }
}

// Fake user data for testing purposes
const fakeUsers = [
    { username: "23BAI10974", password: "Varni@1512" },
];

// Add functionality to check fake users
document.querySelector('.enter-button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission for demo
    const usernameInput = document.querySelector('input[name="username"]').value;
    const passwordInput = document.querySelector('input[name="password"]').value;

    const user = fakeUsers.find(user => user.username === usernameInput && user.password === passwordInput);
    
    if (user) {
        window.location.href = "Employee.html"; // Redirect to Student.html on success
    } else {
        alert('Invalid username or password.'); // Alert on failure
    }
});