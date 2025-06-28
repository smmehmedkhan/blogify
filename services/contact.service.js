import Contact from '../models/contact.model.js';

class ContactService {
  /**
   * Save a new contact message
   */
  async saveContactMessage(contactData) {
    const contact = new Contact(contactData);
    return await contact.save();
  }

  /**
   * Get all contact messages with pagination
   */
  async getContactMessages(page = 1, limit = 20) {
    const totalMessages = await Contact.countDocuments();
    const totalPages = Math.ceil(totalMessages / limit);
    const currentPage = Math.min(Math.max(1, page), totalPages || 1);
    const skipValue = (currentPage - 1) * limit;

    const messages = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skipValue)
      .limit(limit);

    return {
      messages,
      pagination: {
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        nextPage: currentPage < totalPages ? currentPage + 1 : null,
        prevPage: currentPage > 1 ? currentPage - 1 : null,
      },
    };
  }

  /**
   * Get a single contact message by ID
   */
  async getContactMessageById(id) {
    return await Contact.findById(id);
  }

  /**
   * Update contact message status
   */
  async updateMessageStatus(messageId, status) {
    return await Contact.findByIdAndUpdate(
      messageId,
      { status },
      { new: true },
    );
  }
}

export default new ContactService();
