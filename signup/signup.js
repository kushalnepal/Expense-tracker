// JavaScript to toggle the visibility of the password and confirm password fields

const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

function toggleVisibility(inputField) {
    const inputType = inputField.getAttribute('type');
    if (inputType === 'password') {
        inputField.setAttribute('type', 'text');
    } else {
        inputField.setAttribute('type', 'password');
    }
}

togglePassword.addEventListener('click', () => {
    const passwordField = document.getElementById('password');
    toggleVisibility(passwordField);
});

toggleConfirmPassword.addEventListener('click', () => {
    const confirmPasswordField = document.getElementById('confirmPassword');
    toggleVisibility(confirmPasswordField);
});
