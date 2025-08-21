import { APP_URL } from '../config/env.js';
import Subscriber from '../models/subscriber.model.js';
import emailService from '../utils/brevoSMTP.utils.js';

class SubscribeService {
  /**
   * Find a subscriber by email
   * @param {string} email - The email address of the subscriber
   * @returns {Promise<Subscriber|null>} - The subscriber document if found, otherwise null
   */
  async findSubscriberByEmail(email) {
    return await Subscriber.findOne({ email });
  }

  /**
   * Create a new subscriber
   * @param {string} email - The email address of the subscriber
   * @returns {Promise<Subscriber>} - The created subscriber document
   */
  async addSubscriber(email) {
    const subscriber = await Subscriber.create({ email });
    await subscriber.save();
    return subscriber;
  }

  /**
   * Send a welcome email to the newsletter subscriber
   * @param {string} email - The email address of the subscriber
   * @returns {Promise<Object>} - Send status object
   */
  async sendWelcomeEmail(email) {
    const template = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Blogify Newsletter</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                      🚀 Blogify
                    </h1>
                    <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">
                      Empowering Writers & Content Creators
                    </p>
                  </td>
                </tr>

                <!-- Main Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #1a202c; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">
                      Welcome to Our Newsletter! 🎉
                    </h2>

                    <p style="color: #4a5568; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                      Thank you for subscribing to the Blogify newsletter! You're now part of a vibrant community of passionate writers and content creators who are shaping the future of digital storytelling.
                    </p>

                    <div style="background-color: #f7fafc; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                      <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                        What to expect in your inbox:
                      </h3>
                      <ul style="color: #4a5568; margin: 0; padding-left: 20px; line-height: 1.8;">
                        <li><strong>Latest Blog Posts:</strong> Discover featured content from our community</li>
                        <li><strong>Writing Tips:</strong> Expert advice to improve your craft</li>
                        <li><strong>Platform Updates:</strong> New features and improvements</li>
                        <li><strong>Community Highlights:</strong> Success stories and inspiring content</li>
                      </ul>
                    </div>

                    <p style="color: #4a5568; margin: 20px 0; font-size: 16px; line-height: 1.6;">
                      Ready to start your writing journey? Explore our platform and join thousands of creators sharing their stories with the world.
                    </p>

                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${APP_URL}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px; transition: transform 0.2s;">
                        Explore Blogify
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="color: #718096; margin: 0 0 10px 0; font-size: 14px;">
                      Happy reading and writing!<br>
                      <strong>The Blogify Team</strong>
                    </p>
                    <p style="color: #a0aec0; margin: 0; font-size: 12px;">
                      Visit us at <a href="${APP_URL}" style="color: #667eea; text-decoration: none;">${APP_URL}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      await emailService.sendEmail(
        email,
        '🚀 Welcome to Blogify Newsletter!',
        `Welcome to Blogify!\n\nThank you for subscribing to our newsletter! You're now part of a community of passionate writers and content creators.\n\nWhat to expect:\n• Latest blog posts and featured content\n• Writing tips and best practices\n• Platform updates and new features\n• Community highlights and success stories\n\nStay tuned for amazing content coming your way!\n\nHappy reading,\nThe Blogify Team\n\nVisit us: ${APP_URL}`,
        template,
      );

      return {
        status: 200,
        message: `Welcome email sent to ${email}`,
      };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return {
        status: 500,
        message: `Error sending welcome email: ${error.message}`,
      };
    }
  }
}

export default new SubscribeService();
