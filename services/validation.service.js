import validator from 'validator';

import User from '../models/user.model.js';

class ValidationService {
  // Contact form message validation
  validateMessage(message) {
    if (!message || validator.isEmpty(message.trim())) {
      return { isValid: false, error: 'Message is required' };
    }

    if (message.trim().length < 10) {
      return {
        isValid: false,
        error: 'Message must be at least 10 characters long',
      };
    }

    if (message.trim().length > 1000) {
      return { isValid: false, error: 'Message cannot exceed 1000 characters' };
    }

    return { isValid: true };
  }

  // Contact form subject validation
  validateSubject(subject) {
    const validSubjects = [
      'technical-support',
      'feature-suggestion',
      'partnership',
      'feedback',
      'other',
    ];

    if (!subject || validator.isEmpty(subject.trim())) {
      return { isValid: false, error: 'Subject is required' };
    }

    if (!validSubjects.includes(subject)) {
      return { isValid: false, error: 'Please select a valid subject' };
    }

    return { isValid: true };
  }

  // Contact form validation
  validateContactForm({ name, email, subject, message }) {
    const errors = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };

    let isValid = true;

    const nameValidation = this.validateUsername(name);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error;
      isValid = false;
    }

    const emailValidation = this.validateEmail(email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error;
      isValid = false;
    }

    const subjectValidation = this.validateSubject(subject);
    if (!subjectValidation.isValid) {
      errors.subject = subjectValidation.error;
      isValid = false;
    }

    const messageValidation = this.validateMessage(message);
    if (!messageValidation.isValid) {
      errors.message = messageValidation.error;
      isValid = false;
    }

    return { isValid, errors };
  }
  // Contact form message validation
  validateMessage(message) {
    if (!message || validator.isEmpty(message.trim())) {
      return { isValid: false, error: 'Message is required' };
    }

    if (message.trim().length < 10) {
      return {
        isValid: false,
        error: 'Message must be at least 10 characters long',
      };
    }

    if (message.trim().length > 1000) {
      return { isValid: false, error: 'Message cannot exceed 1000 characters' };
    }

    return { isValid: true };
  }

  // Contact form subject validation
  validateSubject(subject) {
    const validSubjects = [
      'technical-support',
      'feature-suggestion',
      'partnership',
      'feedback',
      'other',
    ];

    if (!subject || validator.isEmpty(subject.trim())) {
      return { isValid: false, error: 'Subject is required' };
    }

    if (!validSubjects.includes(subject)) {
      return { isValid: false, error: 'Please select a valid subject' };
    }

    return { isValid: true };
  }

  // Contact form validation
  validateContactForm({ name, email, subject, message }) {
    const errors = {
      nameError: '',
      emailError: '',
      subjectError: '',
      messageError: '',
    };

    let isValid = true;

    const nameValidation = this.validateUsername(name);
    if (!nameValidation.isValid) {
      errors.nameError = nameValidation.error;
      isValid = false;
    }

    const emailValidation = this.validateEmail(email);
    if (!emailValidation.isValid) {
      errors.emailError = emailValidation.error;
      isValid = false;
    }

    const subjectValidation = this.validateSubject(subject);
    if (!subjectValidation.isValid) {
      errors.subjectError = subjectValidation.error;
      isValid = false;
    }

    const messageValidation = this.validateMessage(message);
    if (!messageValidation.isValid) {
      errors.messageError = messageValidation.error;
      isValid = false;
    }

    return { isValid, errors };
  }
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

    return { isValid: true, error: null };
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
