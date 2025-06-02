import crypto from 'crypto';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

import User from '../models/user.model.js';
import createToken from '../utils/createToken.utils.js';
import {
  APP_URL,
  EMAIL_FROM,
  EMAIL_PASSWORD,
  EMAIL_USERNAME,
} from '../.configs/env.js';

class AuthService {
  /**
   * Sign-in user
   */
  async userSignIn(email, password) {
    const user = await User.signIn(email, password);
    const token = createToken(user._id);

    return { user, token };
  }

  /**
   * Sign-up a new user
   */
  async userSignUp(username, email, password) {
    const user = await User.signUp(username, email, password);
    const token = createToken(user._id);

    // Send verification email
    await this.sendVerificationEmail(user);

    return { user, token };
  }

  /**
   * Send verification email
   */
  async sendVerificationEmail(user) {
    try {
      // Generate verification token
      const verificationToken = crypto.randomBytes(20).toString('hex');

      // Set token & expiry time
      user.emailVerificationToken = verificationToken;
      user.emailVerificationExpires = Date.now() + 1000 * 60 * 60; // 1 hours

      await user.save();

      // Create transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USERNAME,
          pass: EMAIL_PASSWORD,
        },
      });

      // Create verification URL
      const verificationUrl = `${APP_URL}/auth/verify/${verificationToken}`;

      // Email options
      const mailOptions = {
        from: EMAIL_FROM,
        to: user.email,
        subject: 'Email Verification - Blogify',
        html: `
          <h1>Welcome to Blogify!</h1>
          <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
          <p>This link will expire in 1 hours.</p>
          <p>If you didn't create an account, please ignore this email.</p>
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      return true;
    } catch (err) {
      console.log('Error to sending verification email: ', err);
      const error = new Error('Error to sending verification email');
      throw error;
    }
  }

  /**
   * Validate verification token
   */
  async verifyEmail(token) {
    // Find user with this token and check if it's still valid
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      const error = new Error(
        'Verification token is invalid or has been expired',
      );
      throw error;
    }

    // Update user verification status & clear token + expire fields
    user.verified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    return user;
  }

  /**
   * Generate password reset token and send email
   */
  async forgotPassword(email) {
    // Find user by email
    const user = await User.findOne({ email });

    // If user not found, return true to prevent email enumeration
    if (!user) {
      return true;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Set token and expiry (1 hour)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1 hour

    await user.save();

    // Send email with reset link
    await this.sendPasswordResetEmail(user.email, resetToken);

    return true;
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email, token) {
    try {
      // Create transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USERNAME,
          pass: EMAIL_PASSWORD,
        },
      });

      // Create reset URL
      const resetUrl = `${APP_URL}/auth/reset-password/${token}`;

      // Email options
      const mailOptions = {
        from: EMAIL_FROM,
        to: email,
        subject: 'Password Reset Request',
        html: `
        <p>You requested a password reset.</p>
        <p>Click this link to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      return true;
    } catch (err) {
      console.log('Error to sending reset password email: ', err);
      const error = new Error('Error to sending reset password email');
      throw error;
    }
  }

  /**
   * Validate reset token
   */
  async validateResetToken(token) {
    // Find user with this token and check if it's still valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    return !!user;
  }

  /**
   * Reset password
   */
  async resetPassword(token, password) {
    // Find user with this token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      const error = new Error('Password reset token is invalid or has expired');
      throw error;
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return true;
  }
}

export default new AuthService();
