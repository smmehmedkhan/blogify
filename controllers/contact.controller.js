import handleError from '../utils/handleError.utils.js';
import validationService from '../services/validation.service.js';
import contactService from '../services/contact.service.js';

/**
 * Render contact page
 */
export function renderContactPage(_req, res) {
  const nonce = res.locals.nonce;
  const locals = {
    title: 'Contact us',
    description: 'Get in touch with the Blogify team',
  };

  const bundle = {
    nonce,
    locals,
    currentRoute: '/contact',
    formData: {},
    errors: {},
  };
  return res.render('pages/contact', bundle);
}

/**
 * Handle contact form submission
 */
export async function submitContactForm(req, res) {
  const nonce = res.locals.nonce;
  const { name, email, subject, message } = req.body;
  const locals = {
    title: 'Contact us',
    description: 'Get in touch with the Blogify team',
  };

  try {
    // Validate form data
    const { isValid, errors } = validationService.validateContactForm({
      name,
      email,
      subject,
      message,
    });

    // If validation fails, re-render the form with errors
    if (!isValid) {
      const bundle = {
        nonce,
        locals,
        currentRoute: '/contact',
        formData: { name, email, subject, message },
        errors,
      };

      return res.render('pages/contact', bundle);
    }

    // Create contact data object
    const contactData = {
      name,
      email,
      subject,
      message,
    };

    // Save contact message to database
    await contactService.saveContactMessage(contactData);

    // Send confirmation email
    await contactService.sendConfirmationEmail(contactData);
    req.flash(
      'success',
      'Thank you for your message! We will get back to you soon.',
    );

    return res.redirect('/contact');
  } catch (error) {
    handleError(res, error);
  }
}
