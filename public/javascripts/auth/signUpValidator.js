document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('SignUpForm');
  const userName = document.getElementById('username');
  const email = document.getElementById('email');
  const pass = document.getElementById('password');
  const confirmPass = document.getElementById('confirmPassword');
  const userNameErr = document.getElementById('userNameError');
  const emailErr = document.getElementById('emailError');
  const passErr = document.getElementById('passError');
  const confirmPassErr = document.getElementById('confirmPassError');
  const submitBtn = document.getElementById('signUpSubmitBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('Sign Up form submited!');
    let isValid = true;

    // Disable the submit button and change text
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Signing Up...';

    // Reset error messages
    userNameErr.innerHTML = '';
    emailErr.innerHTML = '';
    passErr.innerHTML = '';
    confirmPassErr.innerHTML = '';

    // Validate username
    if (!userName.value.trim()) {
      userNameErr.innerHTML = 'Username is required';
      isValid = false;
    }

    // Validate email
    if (!email.value.trim()) {
      emailErr.innerHTML = 'Email is required';
      isValid = false;
    }

    // Validate password
    if (!pass.value.trim()) {
      passErr.innerHTML = 'Password is required';
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPass.value.trim()) {
      confirmPassErr.innerHTML = 'Please re-enter your password here';
      isValid = false;
    } else if (pass.value !== confirmPass.value) {
      confirmPassErr.innerHTML = 'Passwords do not match';
      isValid = false;
    }

    // If validation fails, re-enable the button
    if (!isValid) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Sign Up';
      return;
    }

    // Submit if valid
    form.submit();
  });
});
