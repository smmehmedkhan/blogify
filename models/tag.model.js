import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const Tag = mongoose.model('Tag', tagSchema);
export default Tag;
