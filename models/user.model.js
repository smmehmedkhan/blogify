import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

/**
 * User Model
 * Define schema to store user data to the database
 */
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'User name must be at least 3 character long'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Please provide a valid email address',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long'],
      validate: {
        validator: (value) => validator.isStrongPassword(value),
        message: 'Password is not strong enough',
      },
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
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
  },
  {
    timestamps: true,
  },
);

// Static sign-up method
userSchema.statics.signUp = async function (username, email, password) {
  // Check all fields are filled
  if (!username || !email || !password) {
    throw Error('Please fill in all the fields!');
  }

  // Check user exits?
  const userExist = await this.findOne({ email });
  if (userExist) {
    throw Error('User already exists!');
  }

  // Email validation
  if (!validator.isEmail(email)) {
    throw Error('Please provide a valid email address!');
  }

  // Password validation
  if (!validator.isStrongPassword(password)) {
    throw Error(
      'Password must be at least 6 characters long & contain alphanumeric values.',
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
  const user = await this.findOne({ email });
  if (!user) {
    const error = new Error('Invalid credentials!');
    throw error;
  }

  // Password validation
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const error = new Error('Invalid credentials!');
    throw error;
  }

  return user;
};

const User = mongoose.model('User', userSchema);
export default User;
