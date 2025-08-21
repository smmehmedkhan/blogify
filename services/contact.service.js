import { EMAIL_FROM } from '../config/env.js';
import Contact from '../models/contact.model.js';
import emailService from '../utils/brevoSMTP.utils.js';

class ContactService {
  /**
   * Save a new contact message
   */
  async saveContactMessage(contactData) {
    const contact = await Contact.create(contactData);
    return await contact.save();
  }

  /**
   * Send confirmation email to the user
   */
  async sendConfirmationEmail(contactData) {
    await Promise.all([
      emailService.sendEmail(
        contactData.email,
        'Thank you for contacting Blogify',
        `Hello ${contactData.name},\n\nThank you for reaching out to us. We have received your message regarding "${this.getSubjectLabel(contactData.subject)}". Our team will review your inquiry and get back to you within 24-48 hours.\n\nBest regards,\nThe Blogify Team`,
        this.getUserConfirmationTemplate(contactData),
      ),
      emailService.sendEmail(
        EMAIL_FROM,
        `New Contact Form Submission - ${this.getSubjectLabel(contactData.subject)}`,
        `New contact form submission:\n\nName: ${contactData.name}\nEmail: ${contactData.email}\nSubject: ${this.getSubjectLabel(contactData.subject)}\nMessage: ${contactData.message}`,
        this.getTeamNotificationTemplate(contactData),
      ),
    ]);
  }

  /**
   * User confirmation email template
   */
  getUserConfirmationTemplate(contactData) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">Thank you for contacting Blogify</h2>
          <p style="color: #666; line-height: 1.6;">Hello <strong>${contactData.name}</strong>,</p>
          <p style="color: #666; line-height: 1.6;">We have received your message regarding <strong>"${this.getSubjectLabel(contactData.subject)}"</strong> and appreciate you taking the time to reach out to us.</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #666;"><strong>What happens next?</strong></p>
            <ul style="color: #666; margin: 10px 0;">
              <li>Our team will review your inquiry within 24-48 hours</li>
              <li>You'll receive a personalized response from our support team</li>
              <li>We'll provide detailed assistance based on your specific needs</li>
            </ul>
          </div>
          <p style="color: #666; line-height: 1.6;">If you have any urgent concerns, please don't hesitate to reach out to us directly.</p>
          <p style="color: #666; line-height: 1.6;">Best regards,<br><strong>The Blogify Team</strong></p>
        </div>
      </div>
    `;
  }

  /**
   * Team notification email template
   */
  getTeamNotificationTemplate(contactData) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #d73527; margin-bottom: 20px;">🔔 New Contact Form Submission</h2>
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 0; color: #856404;"><strong>Action Required:</strong> New customer inquiry needs response within 24 hours</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #333; width: 120px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">${contactData.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;"><a href="mailto:${contactData.email}" style="color: #007bff;">${contactData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Subject:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">${this.getSubjectLabel(contactData.subject)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333; vertical-align: top;">Message:</td>
              <td style="padding: 10px; color: #666; line-height: 1.6;">${contactData.message}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-radius: 5px;">
            <p style="margin: 0; color: #0c5460;"><strong>Next Steps:</strong></p>
            <ol style="color: #0c5460; margin: 10px 0;">
              <li>Assign to appropriate team member</li>
              <li>Update status in admin panel</li>
              <li>Respond within 24-48 hours</li>
              <li>Mark as resolved when complete</li>
            </ol>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Convert subject enum to readable label
   */
  getSubjectLabel(subject) {
    const labels = {
      'technical-support': 'Technical Support',
      'feature-suggestion': 'Feature Suggestion',
      partnership: 'Partnership Inquiry',
      feedback: 'Feedback',
      other: 'General Inquiry',
    };
    return labels[subject] || 'General Inquiry';
  }
}

export default new ContactService();
