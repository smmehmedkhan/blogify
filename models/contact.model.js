import mongoose from 'mongoose';

/**
 * Contact Message Model
 * Define schema for storing contact form submissions
 */
const Schema = mongoose.Schema;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    subject: {
      type: String,
      required: true,
      enum: ['technical-support', 'feature-suggestion', 'partnership', 'feedback', 'other']
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['new', 'read', 'responded'],
      default: 'new'
    }
  },
  {
    timestamps: true
  }
);

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;