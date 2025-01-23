import authController from "../../controllers/authController.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email');
  const password = document.getElementById('password');

  let valid = true;

  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(msg => msg.classList.add('hidden'));

  if (email.value.trim() === "" || !emailRegex.test(email.value)) {
    showError(email);
    valid = false;
  }

  if (password.value.trim() === "") {
    showError(password);
    valid = false;
  }

  if (valid) {

    authController.loginController(email.value, password.value)
      .then(data => {
        if(data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("loggedIn", true);
          
          navigateToDashboard(data.token); 

          // alert(data.message);
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

const navigateToDashboard = (token) => {
  console.log( 'token', token )
  try {
      const decodedToken = jwt_decode(token);
      console.log( decodedToken )
      const idUser = decodedToken.id;

      authController.getUserById(idUser, token)
        .then(result => {
          console.log( result )
            if(result.success) {
              const user = result.data;

              window.location.href = `/dashboard?user=${encodeURIComponent(JSON.stringify(user))}`;
              
            } else {
                alert(result.message);
            }
        });

  } catch (error) {
      console.error('Error al decodificar el token:', error);
  }
}