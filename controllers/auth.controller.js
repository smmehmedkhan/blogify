import handleError from '../utils/handleError.utils.js';
import authService from '../services/auth.service.js';
import validationService from '../services/validation.service.js';
import User from '../models/user.model.js';

/**
 * Handle user sign in
 */
export async function signIn(req, res) {
  const nonce = res.locals.nonce;
  const { email, password } = req.body;
  const locals = {
    title: 'Blogify | Sign In',
    description: 'You can sign in to your account here.',
  };

  try {
    // Validate sign-in data
    const { isValid, errors } = validationService.validateSignIn({
      email,
      password,
    });

    // If validation failed render sing-in page
    if (!isValid) {
      const bundle = {
        nonce,
        locals,
        email,
        emailError: errors.emailError,
        password,
        notValidPassword: errors.notValidPassword,
        currentRoute: '/auth/sign-in',
      };

      return res.status(400).render('pages/auth/sign-in', bundle);
    }

    // Authenticate sign-in
    const { user, token } = await authService.userSignIn(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.user = user;
    req.flash('success', 'You have successfully signed in!'); // Success message for toast

    // Check user verification
    if (!user.verified) {
      req.flash('warning', 'Please verify your email address!');
    }

    // Redirect to the original URL or dashboard if none exists
    const returnTo = req.session.returnTo || '/users/dashboard';
    // delete req.session.returnTo;
    return res.redirect(returnTo);
  } catch (error) {
    let emailError = '',
      notValidPassword = error.message;

    req.flash('error', error.message);

    const bundle = {
      locals,
      email,
      emailError,
      password,
      notValidPassword,
      currentRoute: '/auth/sign-in',
    };

    return res.status(401).render('pages/auth/sign-in', bundle);
  }
}

/**
 * Render sign in page
 */
export async function signInPage(req, res) {
  const nonce = res.locals.nonce;
  const locals = {
    title: 'Blogify | Sign In',
    description: 'You can sign in to your account here.',
  };

  try {
    const bundle = {
      nonce,
      locals,
      email: null,
      emailError: '',
      password: null,
      notValidPassword: '',
      currentRoute: '/auth/sign-in',
    };

    return res.render('pages/auth/sign-in', bundle);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * Handle user sign out
 */
export async function signOut(req, res) {
  try {
    res.clearCookie('token');
    req.flash('success', 'You have successfully signed out!');
    return res.redirect('/');
  } catch (error) {
    req.flash('error', error.message);
    handleError(res, error);
  }
}

/**
 * Handle user sign up
 */
export async function signUp(req, res) {
  const nonce = res.locals.nonce;
  const locals = {
    title: 'Blogify | Sign Up',
    description: 'You can sign up an account by filling out this form',
  };
  const { username, email, password, confirmPassword } = req.body;

  try {
    // Validate sign-up data
    const { isValid, errors } = await validationService.validateSignUp({
      userName: username,
      email,
      password,
      confirmPassword,
    });

    // If validation failed render sing-up page
    if (!isValid) {
      const bundle = {
        nonce,
        locals,
        userName: username,
        userNameError: errors.userNameError,
        email,
        emailError: errors.emailError,
        password,
        notValidPassword: errors.notValidPassword,
        confirmPassword,
        passMismatch: errors.passMismatch,
        currentRoute: '/auth/sign-up',
      };

      return res.status(400).render('pages/auth/sign-up', bundle);
    }

    // Sign-up user
    const { user, token } = await authService.userSignUp(
      username,
      email,
      password,
    );

    res.user = user; // Add user info
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    req.flash('success', 'You have successfully signed up!');
    req.flash('warning', 'Please verify your email address!');
    return res.redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', error.message);
    handleError(res, error);
  }
}

/**
 * Render sign up page
 */
export async function signUpPage(req, res) {
  const nonce = res.locals.nonce;
  const locals = {
    title: 'Blogify | Sign Up',
    description: 'You can sign up an account by filling out this form',
  };

  try {
    const bundle = {
      nonce,
      locals,
      userName: null,
      userNameError: '',
      email: null,
      emailError: '',
      password: null,
      notValidPassword: '',
      confirmPassword: null,
      passMismatch: '',
      currentRoute: '/auth/sign-up',
    };
    return await res.render('pages/auth/sign-up', bundle);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * Verify user email
 */
export async function verification(req, res) {
  const { token } = req.params;

  try {
    const user = await authService.verifyEmail(token);

    // Check if user already signed in
    if (req?.user?._id.toString() === user?._id.toString()) {
      return res.redirect('/users/dashboard'); // Signed in? redirect to dashboard
    }
    // Clear any existing token to avoid redirect loop
    res.clearCookie('token');

    req.flash('success', 'Your email verification succeeded');

    return res.redirect('/auth/sign-in?verified=true');
  } catch (error) {
    req.flash('error', error.message || 'Email verification failed');
    return res.redirect('/auth/sign-in?verified=false');
  }
}

/**
 * Render verification required page
 */
export async function verificationPage(req, res) {
  const nonce = res.locals.nonce;
  const verified = req.user.verified;

  const locals = {
    title: 'Blogify | Email Verification',
    description: 'Please verify your email to continue.',
  };

  if (!verified) {
    try {
      const bundle = {
        nonce,
        locals,
        currentRoute: '/auth/verify',
        user: req.user,
      };

      return res.render('pages/auth/verification', bundle);
    } catch (error) {
      handleError(res, error);
    }
  }

  // Redirect to the original URL or dashboard if none exists
  const returnTo = req.session.returnTo || '/users/dashboard';
  // delete req.session.returnTo;
  return res.redirect(returnTo);
}

/**
 * Resend verification email
 */
export async function resendVerification(req, res) {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    // Check if email already verified
    if (user.verified) {
      req.flash('info', 'Your email is already verified');
      return res.redirect('/users/dashboard');
    }

    await authService.sendVerificationEmail(user);

    req.flash('success', 'Verification mail has send to your email address');

    return res.redirect('/auth/verify');
  } catch (error) {
    req.flash('error', error.message || 'Failed to send verification email');
    handleError(res, error);
  }
}

/**
 * Render forgot password page
 */
export async function forgotPasswordPage(req, res) {
  const nonce = res.locals.nonce;
  const locals = {
    title: 'Blogify | Forgot Password',
    description: 'Reset your password by submitting your email address.',
  };

  try {
    const bundle = {
      nonce,
      locals,
      email: null,
      emailError: '',
      message: '',
      currentRoute: '/auth/forgot-password',
    };

    return res.render('pages/auth/forgot-password', bundle);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * Handle forgot password request
 */
export async function forgotPassword(req, res) {
  const nonce = res.locals.nonce;
  const locals = {
    title: 'Blogify | Forgot Password',
    description: 'Reset your password by submitting your email address.',
  };
  const { email } = req.body;

  try {
    // Validate email
    const emailValidation = validationService.validateEmail(email);

    if (!emailValidation.isValid) {
      const bundle = {
        nonce,
        locals,
        email,
        emailError: emailValidation.error,
        message: '',
        currentRoute: '/auth/forgot-password',
      };

      return res.status(400).render('pages/auth/forgot-password', bundle);
    }

    // Process forgot password request
    await authService.forgotPassword(email);

    const bundle = {
      nonce,
      locals,
      email,
      emailError: '',
      message:
        'If your email exists in our system, you will receive an email with password reset link.',
      currentRoute: '/auth/forgot-password',
    };

    req.flash('info', 'Password reset link sent to your email address');
    return res.render('pages/auth/forgot-password', bundle);
  } catch (error) {
    req.flash('error', error.message);
    handleError(res, error);
  }
}

/**
 * Render reset password page
 */
export async function resetPasswordPage(req, res) {
  const nonce = res.locals.nonce;
  const { token } = req.params;
  const locals = {
    title: 'Blogify | Reset Password',
    description: 'Update your password incase you forget it.',
  };

  try {
    // Validate token
    const isValidToken = await authService.validateResetToken(token);

    if (!isValidToken) {
      return res.redirect('/auth/forgot-password');
    }

    const bundle = {
      nonce,
      locals,
      token,
      password: null,
      confirmPassword: null,
      notValidPassword: '',
      passMismatch: '',
      currentRoute: '/auth/reset-password',
    };

    return res.render('pages/auth/reset-password', bundle);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * Handle password reset
 */
export async function resetPassword(req, res) {
  const nonce = res.locals.nonce;
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  const locals = {
    title: 'Blogify | Reset Password',
    description: 'Enter your new password here.',
  };

  try {
    // Validate password
    const { isValid, errors } = validationService.validatePasswordReset({
      password,
      confirmPassword,
    });

    if (!isValid) {
      const bundle = {
        nonce,
        locals,
        token,
        password,
        confirmPassword,
        notValidPassword: errors.notValidPassword,
        passMismatch: errors.passMismatch,
        currentRoute: '/auth/reset-password',
      };

      return res.status(400).render('pages/auth/reset-password', bundle);
    }

    // Reset password
    await authService.resetPassword(token, password);

    req.flash('success', 'Password reset successfullyy');
    return res.redirect('/auth/sign-in');
  } catch (error) {
    req.flash('error', error.message);
    handleError(res, error);
  }
}
