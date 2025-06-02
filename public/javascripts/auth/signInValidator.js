document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('SignInForm');
  const email = document.getElementById('email');
  const pass = document.getElementById('password');
  const emailErr = document.getElementById('signInEmailError');
  const passErr = document.getElementById('signInPassError');
  const submitBtn = document.getElementById('signInSubmitBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('Sign In form submited!');
    let isValid = true;

    // Disable the submit button and change text
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Signing In...';

    // Reset error messages
    emailErr.innerHTML = '';
    passErr.innerHTML = '';

    // Validate email
    if (!email.value.trim()) {
      emailErr.innerHTML = 'Email is required';
      isValid = false;
    }

    // Validate password
    if (!pass.value) {
      passErr.innerHTML = 'Password is required';
      isValid = false;
    }

    // If validation fails, re-enable the button
    if (!isValid) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Sign In';
      return;
    }

    // Submit if valid
    form.submit();
  });
});
