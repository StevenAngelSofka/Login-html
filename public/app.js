const validUsername = "admin";
const validPassword = "admin1234";

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault(); 

  const username = document.getElementById('username');
  const password = document.getElementById('password');
  let valid = true;

  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(msg => msg.classList.add('hidden'));

  if (username.value.trim() === "") {
    showError(username);
    valid = false;
  }

  if (password.value.trim() === "") {
    showError(password);
    valid = false;
  }

  if (valid) {
    if (username.value === validUsername && password.value === validPassword) {

      alert("Login successful! Please check LocalStorage.");
      localStorage.setItem("username", username.value);
      localStorage.setItem("loggedIn", true);

    } else {
      // Credenciales incorrectas
      alert("Incorrect username or password. Please try again.");
    }
  }
});

const showError = (inputElement) => {
  const errorMessage = inputElement.nextElementSibling;
  if (errorMessage && errorMessage.classList.contains('error-message')) {
    errorMessage.classList.remove('hidden');
  }
};