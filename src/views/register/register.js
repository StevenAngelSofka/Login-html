import authController from "../../controllers/authController.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const identificationNumber = document.getElementById('identificationNumber');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let valid = true;

    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.classList.add('hidden'));

    if (identificationNumber.value.trim() === "") {
        showError(identificationNumber);
        valid = false;
    }

    if (name.value.trim() === "") {
        showError(name);
        valid = false;
    }

    if (email.value.trim() === "" || !emailRegex.test(email.value)) {
        showError(email);
        valid = false;
    }

    if (password.value.trim() === "") {
        showError(password);
        valid = false;
    }

    if (valid) {
      authController.registerController(identificationNumber.value, name.value, email.value, password.value)
        .then(data => {
          if(data.success) {
            alert(data.message);
            window.location.href = "/";  
          } else {
            alert(data.message);
          }
        });
    }
});

const showError = (inputElement) => {
    const errorMessage = inputElement.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
      errorMessage.classList.remove('hidden');
    }
  };