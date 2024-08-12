document.getElementById('registerForm').addEventListener('submit', function(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    let valid = true;

    // Clear previous messages
    messageElement.textContent = '';

    // Username validation
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if (!usernamePattern.test(username)) {
        messageElement.textContent += 'Username can only contain letters and digits.\n';
        valid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;
    if (!passwordPattern.test(password)) {
        messageElement.textContent += 'Password must be at least 4 characters long, and contain at least one letter and one digit.\n';
        valid = false;
    }

    if (!valid) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});
