import validator from 'validator';

import User from '../models/user.model.js';

class ValidationService {
  // User name validation
  validateUsername(userName) {
    // Check empty fields
    if (!userName || validator.isEmpty(userName.trim())) {
      return { isValid: false, error: 'Username is required' };
    }

    // Check user name length <= 3
    if (userName.length < 3) {
      return {
        isValid: false,
        error: 'Username must be at least 3 characters long',
      };
    }

    return { isValid: true };
  }

  // Email validation
  validateEmail(email) {
    // Check empty fields
    if (!email || validator.isEmpty(email.trim())) {
      return { isValid: false, error: 'Email is required' };
    }

    if (!validator.isEmail(email)) {
      return { isValid: false, error: 'Please provide a valid email address' };
    }

    return { isValid: true };
  }

  // Validate exits email
  async validateExitsEmail(email) {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return { isValid: false, error: 'Email already exists' };
    }

    return { isValid: true };
  }

  // Password validation
  validatePassword(password) {
    if (!password || validator.isEmpty(password)) {
      return { isValid: false, error: 'Password is required' };
    }

    if (!validator.isStrongPassword(password)) {
      return {
        isValid: false,
        error:
          'Password must contain at least 6 character & alpanumeric values.',
      };
    }

    return { isValid: true };
  }

  // Confirm password validation
  validatePassword(confirmPassword) {
    if (!confirmPassword || validator.isEmpty(confirmPassword)) {
      return { isValid: false, error: 'Please re-enter your password here.' };
    }

    return { isValid: true };
  }

  // Confirm password validation
  validatePasswordMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
      return { isValid: false, error: 'Passwords do not match' };
    }

    return { isValid: true };
  }

  // Sign-in form validation
  validateSignIn({ email, password }) {
    const errors = {
      emailError: '',
      notValidPassword: '',
    };
    let isValid = true;

    const emailValidation = this.validateEmail(email);
    if (!emailValidation.isValid) {
      errors.emailError = emailValidation.error;
      isValid = false;
    }

    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.notValidPassword = passwordValidation.error;
      isValid = false;
    }

    return { isValid, errors };
  }

  // Sign-up form validation
  async validateSignUp({ userName, email, password, confirmPassword }) {
    const errors = {
      userNameError: '',
      emailError: '',
      notValidPassword: '',
      passMismatch: '',
    };

    let isValid = true;

    const userNameValidation = this.validateUsername(userName);
    if (!userNameValidation.isValid) {
      errors.userNameError = userNameValidation.error;
      isValid = false;
    }

    // First check basic email format
    const emailValidation = this.validateEmail(email);
    if (!emailValidation.isValid) {
      errors.emailError = emailValidation.error;
      isValid = false;
    } else {
      // Then check if email already exists (only if format is valid)
      const emailExistsValidation = await this.validateExitsEmail(email);
      if (!emailExistsValidation.isValid) {
        errors.emailError = emailExistsValidation.error;
        isValid = false;
      }
    }

    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.notValidPassword = passwordValidation.error;
      isValid = false;
    }

    const confirmPasswordValidation = this.validatePassword(confirmPassword);
    if (!confirmPasswordValidation.isValid) {
      errors.passMismatch = confirmPasswordValidation.error;
      isValid = false;
    }

    const passwordMatchValidation = this.validatePasswordMatch(
      password,
      confirmPassword,
    );
    if (!passwordMatchValidation.isValid) {
      errors.passMismatch = passwordMatchValidation.error;
      isValid = false;
    }

    return { isValid, errors };
  }

  // Password reset validation
  validatePasswordReset({ password, confirmPassword }) {
    const errors = {
      notValidPassword: '',
      passMismatch: '',
    };
    let isValid = true;

    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.notValidPassword = passwordValidation.error;
      isValid = false;
    }

    const passwordMatchValidation = this.validatePasswordMatch(
      password,
      confirmPassword,
    );
    if (!passwordMatchValidation.isValid) {
      errors.passMismatch = passwordMatchValidation.error;
      isValid = false;
    }

    return { isValid, errors };
  }
}

export default new ValidationService();
