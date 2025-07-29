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
      required: [true, 'Name is required'],
      trim: true,
      min: 2,
      max: 32,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      max: 32,
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      enum: [
        'technical-support',
        'feature-suggestion',
        'partnership',
        'feedback',
        'other',
      ],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      min: 10,
      max: 1000,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'responded'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  },
);

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
