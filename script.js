function selectAccount(accountType) {
    const agentLogo = document.querySelector('.agent-logo');
    const playerLogo = document.querySelector('.player-logo');

    if (accountType === 'agent') {
        agentLogo.classList.add('selected');
        playerLogo.classList.remove('selected');
    } else if (accountType === 'player') {
        playerLogo.classList.add('selected');
        agentLogo.classList.remove('selected');
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const showPassword = document.querySelector('.show-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPassword.classList.add('active');
    } else {
        passwordInput.type = 'password';
        showPassword.classList.remove('active');
    }
}

// ... Other JavaScript code ...
