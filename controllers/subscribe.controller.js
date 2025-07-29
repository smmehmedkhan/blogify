import validationService from '../services/validation.service.js';
import SubscribeService from '../services/subscribe.service.js';

export async function subscribe(req, res) {
  const { subscribeEmail } = req.body;

  try {
    // Validate email
    const { isValid, error } = validationService.validateEmail(subscribeEmail);

    // If validation fails, return error response
    if (!isValid) {
      req.flash('error', error);
      return res.status(406).json({ message: error });
    }

    // Check if the email already exists in the database
    const isSubscribed =
      await SubscribeService.findSubscriberByEmail(subscribeEmail);
    if (isSubscribed) {
      req.flash('error', 'This email address already in used.');
    }

    // Create a new subscriber
    await SubscribeService.addSubscriber(subscribeEmail);
    req.flash('success', 'Subscription successful for ' + subscribeEmail);

    // Send welcome email
    const { status, message } =
      await SubscribeService.sendWelcomeEmail(subscribeEmail);
    if (status === 200) {
      req.flash('info', message);
    }

    if (status === 500) {
      req.flash('error', message);
    }

    const redirectTo = req.session.returnTo || '/';
    delete req.session.returnTo; // Clear returnTo after redirect

    return res.redirect(redirectTo);
  } catch (error) {
    req.flash('error', error.message || 'Internal server error');

    const redirectTo = req.session.returnTo || '/';
    delete req.session.returnTo;

    return res.redirect(redirectTo);
  }
}
