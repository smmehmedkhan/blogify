import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

/**
 * User Model
 * Define schema to store user data to the database
 */
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [20, 'Name cannot be more than 20 characters long.'],
    },
    username: {
      type: String,
      required: [true, 'A username is required.'],
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long.'],
      maxlength: [20, 'Username cannot be more than 20 characters long.'],
      match: [
        /^[a-zA-Z0-9_]+$/,
        'Username is invalid. It can only contain letters, numbers, and underscores (_).',
      ],
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [160, 'Bio cannot be more than 160 characters long.'],
    },
    photo: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    profession: {
      type: String,
      trim: true,
      maxlength: [20, 'Profession cannot be more than 20 characters long.'],
    },
    location: {
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    email: {
      type: String,
      required: [true, 'An email is required.'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'A password is required.'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    socials: {
      facebook: { type: String, trim: true },
      instagram: { type: String, trim: true },
      twitter: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      website: { type: String, trim: true },
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    readingList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpires: {
      type: Date,
      default: Date.now(),
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    passwordResetUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Static sign-up method
userSchema.statics.signUp = async function (username, email, password) {
  // Check all fields are filled
  if (!username || !email || !password) {
    throw new Error('Please fill in all the fields!');
  }

  // Check user exits?
  const userExist = await this.findOne({ email });
  if (userExist) {
    throw new Error('User already exists!');
  }

  // Email validation
  if (!validator.isEmail(email)) {
    throw new Error('Please provide a valid email address!');
  }

  // Password validation
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      'Password must be at least 8 characters long & contain alphanumeric values.',
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hashedPassword });

  return user;
};

// Static sign-in method
userSchema.statics.signIn = async function (email, password) {
  // Email validation
  const isUser = await this.findOne({ email });
  if (!isUser) {
    const error = new Error('Invalid credentials!');
    throw error;
  }

  // Password validation
  const match = await bcrypt.compare(password, isUser.password);
  if (!match) {
    const error = new Error('Invalid credentials!');
    throw error;
  }

  const user = await this.findOne({ email }).select(
    '-password -emailVerificationToken -emailVerificationExpires -resetPasswordToken -resetPasswordExpires -passwordResetUsed -createdAt -updatedAt -__v',
  );

  return user;
};

const User = mongoose.model('User', userSchema);
export default User;
