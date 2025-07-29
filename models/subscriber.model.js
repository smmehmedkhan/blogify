import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'An email is required.'],
    trim: true,
    lowercase: true,
  },
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
export default Subscriber;
