import nodemailer from 'nodemailer';
import {
  BREVO_SMTP_HOST,
  BREVO_SMTP_PORT,
  BREVO_SMTP_USER,
  BREVO_SMTP_PASS,
  EMAIL_FROM,
} from '../config/env.js';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: BREVO_SMTP_HOST,
      port: BREVO_SMTP_PORT,
      secure: false,
      auth: {
        user: BREVO_SMTP_USER,
        pass: BREVO_SMTP_PASS,
      },
    });
  }

  async sendEmail(to, subject, text, html) {
    const mailOptions = {
      from: EMAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

export default new EmailService();
