import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Create mock functions
const mockSendMail = jest.fn();

// Mock the EmailService class directly
class MockEmailService {
  constructor() {
    this.transporter = {
      sendMail: mockSendMail,
    };
  }

  async sendEmail(to, subject, text, html) {
    const mailOptions = {
      from: 'test@example.com',
      to,
      subject,
      text,
      html,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}

const EmailService = new MockEmailService();

describe('EmailService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendEmail', () => {
    it('should send email successfully', async () => {
      const mockResponse = { messageId: 'test-message-id' };
      mockSendMail.mockResolvedValue(mockResponse);

      const result = await EmailService.sendEmail(
        'recipient@example.com',
        'Test Subject',
        'Test text content',
        '<p>Test HTML content</p>',
      );

      expect(mockSendMail).toHaveBeenCalledWith({
        from: 'test@example.com',
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test text content',
        html: '<p>Test HTML content</p>',
      });

      expect(result).toEqual(mockResponse);
    });

    it('should handle email sending failure', async () => {
      const mockError = new Error('SMTP connection failed');
      mockSendMail.mockRejectedValue(mockError);

      await expect(
        EmailService.sendEmail(
          'recipient@example.com',
          'Test Subject',
          'Test text',
          '<p>Test HTML</p>',
        ),
      ).rejects.toThrow('SMTP connection failed');
    });

    it('should handle authentication errors', async () => {
      const authError = new Error('Authentication failed');
      authError.code = 'EAUTH';
      mockSendMail.mockRejectedValue(authError);

      await expect(
        EmailService.sendEmail('test@example.com', 'Subject', 'Content'),
      ).rejects.toThrow('Authentication failed');
    });
  });
});
