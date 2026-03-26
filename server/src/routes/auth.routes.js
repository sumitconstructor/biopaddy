/**
 * FILE: server/src/routes/auth.routes.js
 *
 * Replaces the original auth.routes.js entirely.
 * Changes:
 *   1. Email OTP (via Nodemailer) replaces phone/SMS OTP for ALL user types.
 *   2. Strict regex validation for email, password, bank account, IFSC.
 *   3. Farmer registration now accepts `email` instead of `phone_number` as primary identifier.
 *   4. OTP is stored server-side in a lightweight in-memory Map (swap for Redis in production).
 *   5. /login always uses email + password — no phone fallback.
 */

import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User, Farmer, Customer } from '../models/index.js';

const router = Router();

// ─── In-memory OTP store (replace with Redis in production) ──────────────────
// Structure: { email: { otp, expiresAt, purpose } }
const otpStore = new Map();

// ─── Nodemailer transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail', // <-- This single line replaces host, port, and secure!
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ─── Regex constants ──────────────────────────────────────────────────────────
const REGEX = {
  // RFC-5321 practical email validation
  email: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
  // Min 8 chars, at least 1 digit, at least 1 special character
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,}$/,
  // Indian bank account: 9–18 digits
  bankAccount: /^[0-9]{9,18}$/,
  // IFSC: 4 letters + 0 + 6 alphanumeric
  ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
};

// ─── Helper: generate + email OTP ────────────────────────────────────────────
async function sendOtpEmail(email, purpose = 'verification') {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(email.toLowerCase(), { otp, expiresAt, purpose });

  const subjectMap = {
    verification: 'BioPaddy – Verify Your Email',
    login: 'BioPaddy – Your Login OTP',
    reset: 'BioPaddy – Password Reset OTP',
  };

  await transporter.sendMail({
    from: `"BioPaddy 🌾" <${process.env.SMTP_USER}>`,
    to: email,
    subject: subjectMap[purpose] || 'BioPaddy OTP',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#16a34a">🌾 BioPaddy</h2>
        <p>Your one-time password is:</p>
        <div style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#1e293b;
                    background:#f1f5f9;padding:16px 24px;border-radius:8px;display:inline-block">
          ${otp}
        </div>
        <p style="color:#64748b;font-size:14px">This OTP expires in <strong>10 minutes</strong>.<br>
        Do not share it with anyone.</p>
      </div>`,
  });

  return otp; // returned only for dev logging — do NOT expose in API response
}

// ─── Helper: verify OTP ───────────────────────────────────────────────────────
function verifyStoredOtp(email, otp) {
  const record = otpStore.get(email.toLowerCase());
  if (!record) return { valid: false, reason: 'No OTP found. Please request a new one.' };
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email.toLowerCase());
    return { valid: false, reason: 'OTP has expired. Please request a new one.' };
  }
  if (record.otp !== otp) return { valid: false, reason: 'Invalid OTP.' };
  otpStore.delete(email.toLowerCase()); // single-use
  return { valid: true };
}

// ─── Helper: generate JWT pair ───────────────────────────────────────────────
function generateTokens(user) {
  const payload = {
    user_id: user.user_id,
    user_type: user.user_type,
    profile_name: user.profile_name,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '24h',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d',
  });
  return { token, refreshToken };
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/send-otp
// Body: { email, purpose? }   purpose: 'verification' | 'login' | 'reset'
// ─────────────────────────────────────────────────────────────────────────────
router.post('/send-otp', async (req, res, next) => {
  try {
    const { email, purpose = 'verification' } = req.body;

    if (!email || !REGEX.email.test(email)) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }

    await sendOtpEmail(email, purpose);

    // In development, log the OTP to console for easy testing
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEV] OTP for ${email}:`, otpStore.get(email.toLowerCase())?.otp);
    }

    res.json({ success: true, message: `OTP sent to ${email}. It expires in 10 minutes.` });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/verify-otp
// Body: { email, otp }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
  }
  const result = verifyStoredOtp(email, otp);
  if (!result.valid) {
    return res.status(400).json({ success: false, message: result.reason });
  }
  res.json({ success: true, message: 'OTP verified successfully.' });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/register/farmer
// Body: { email, profile_name, password, otp, aadhaar_number, land_area_acres,
//         primary_crop, language_preference, farm_location_lat,
//         farm_location_long, bank_account_number, bank_ifsc }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/register/farmer', async (req, res, next) => {
  try {
    const {
      email, profile_name, password, otp,
      aadhaar_number, land_area_acres, primary_crop,
      language_preference, farm_location_lat, farm_location_long,
      bank_account_number, bank_ifsc,
    } = req.body;

    // ── 1. Presence checks ──────────────────────────────────────────────────
    if (!email || !profile_name || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email, full name, password, and OTP are required.',
      });
    }

    // ── 2. Regex validation ─────────────────────────────────────────────────
    const errors = [];
    if (!REGEX.email.test(email)) errors.push('Invalid email format.');
    if (!REGEX.password.test(password))
      errors.push('Password must be at least 8 characters and include at least one number and one special character.');
    if (bank_account_number && !REGEX.bankAccount.test(bank_account_number))
      errors.push('Bank account number must be 9–18 digits.');
    if (bank_ifsc && !REGEX.ifsc.test(bank_ifsc.toUpperCase()))
      errors.push('IFSC code must be in the format: ABCD0123456 (4 letters + 0 + 6 alphanumeric).');

    if (errors.length) {
      return res.status(422).json({ success: false, message: 'Validation failed.', errors });
    }

    // ── 3. OTP verification ─────────────────────────────────────────────────
    const otpResult = verifyStoredOtp(email, otp);
    if (!otpResult.valid) {
      return res.status(400).json({ success: false, message: otpResult.reason });
    }

    // ── 4. Duplicate check ──────────────────────────────────────────────────
    const exists = await User.findOne({ where: { email: email.toLowerCase() } });
    if (exists) {
      return res.status(409).json({ success: false, message: 'This email is already registered.' });
    }

    // ── 5. Create user + farmer profile ────────────────────────────────────
    const password_hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email: email.toLowerCase(),
      profile_name: profile_name.trim(),
      password_hash,
      user_type: 'farmer',
      is_verified: true, // email already verified via OTP
    });

    const farmer = await Farmer.create({
      user_id: user.user_id,
      aadhaar_number,
      land_area_acres,
      primary_crop,
      language_preference,
      farm_location_lat,
      farm_location_long,
      bank_account_number,
      bank_ifsc: bank_ifsc?.toUpperCase(),
    });

    const tokens = generateTokens(user);
    res.status(201).json({
      success: true,
      message: 'Farmer registered successfully.',
      data: {
        user: {
          user_id: user.user_id,
          profile_name: user.profile_name,
          email: user.email,
          user_type: user.user_type,
        },
        farmer_id: farmer.farmer_id,
        ...tokens,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/register/customer
// Body: { email, profile_name, password, otp, company_name, business_type,
//         gst_number?, contact_person, phone_number?, shipping_address }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/register/customer', async (req, res, next) => {
  try {
    const {
      email, profile_name, password, otp,
      company_name, business_type, gst_number,
      contact_person, phone_number, shipping_address,
    } = req.body;

    // ── 1. Presence checks ──────────────────────────────────────────────────
    if (!email || !profile_name || !password || !otp || !company_name) {
      return res.status(400).json({
        success: false,
        message: 'Email, name, password, OTP, and company name are required.',
      });
    }

    // ── 2. Regex validation ─────────────────────────────────────────────────
    const errors = [];
    if (!REGEX.email.test(email)) errors.push('Invalid email format.');
    if (!REGEX.password.test(password))
      errors.push('Password must be at least 8 characters and include at least one number and one special character.');

    if (errors.length) {
      return res.status(422).json({ success: false, message: 'Validation failed.', errors });
    }

    // ── 3. OTP verification ─────────────────────────────────────────────────
    const otpResult = verifyStoredOtp(email, otp);
    if (!otpResult.valid) {
      return res.status(400).json({ success: false, message: otpResult.reason });
    }

    // ── 4. Duplicate check ──────────────────────────────────────────────────
    const exists = await User.findOne({ where: { email: email.toLowerCase() } });
    if (exists) {
      return res.status(409).json({ success: false, message: 'This email is already registered.' });
    }

    // ── 5. Create user + customer profile ──────────────────────────────────
    const password_hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email: email.toLowerCase(),
      phone_number,
      profile_name: profile_name.trim(),
      password_hash,
      user_type: 'customer',
      is_verified: true,
    });

    const customer = await Customer.create({
      user_id: user.user_id,
      company_name: company_name.trim(),
      business_type,
      gst_number,
      contact_person,
      shipping_address,
    });

    const tokens = generateTokens(user);
    res.status(201).json({
      success: true,
      message: 'Customer registered successfully.',
      data: {
        user: {
          user_id: user.user_id,
          profile_name: user.profile_name,
          email: user.email,
          user_type: user.user_type,
        },
        customer_id: customer.customer_id,
        ...tokens,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/login
// Body: { email, password }  — works for farmer, customer, and admin
// ─────────────────────────────────────────────────────────────────────────────
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    if (!REGEX.email.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    if (!user.is_active) {
      return res.status(403).json({ success: false, message: 'Your account has been suspended. Contact support.' });
    }

    // Load role-specific profile
    let profile = null;
    if (user.user_type === 'farmer') {
      profile = await Farmer.findOne({ where: { user_id: user.user_id } });
    } else if (user.user_type === 'customer') {
      profile = await Customer.findOne({ where: { user_id: user.user_id } });
    }

    const tokens = generateTokens(user);
    res.json({
      success: true,
      data: {
        user: {
          user_id: user.user_id,
          profile_name: user.profile_name,
          email: user.email,
          user_type: user.user_type,
          is_verified: user.is_verified,
        },
        profile,
        ...tokens,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/refresh
// Body: { refreshToken }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ success: false, message: 'Refresh token required.' });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const tokens = generateTokens({
      user_id: decoded.user_id,
      user_type: decoded.user_type,
      profile_name: decoded.profile_name,
      email: decoded.email,
    });
    res.json({ success: true, data: tokens });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired refresh token.' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/auth/me  — return current user from JWT (used by AuthContext on load)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/me', async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided.' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.user_id, {
      attributes: ['user_id', 'profile_name', 'email', 'user_type', 'is_verified', 'is_active'],
    });
    if (!user || !user.is_active) {
      return res.status(401).json({ success: false, message: 'User not found or inactive.' });
    }

    let profile = null;
    if (user.user_type === 'farmer') {
      profile = await Farmer.findOne({ where: { user_id: user.user_id } });
    } else if (user.user_type === 'customer') {
      profile = await Customer.findOne({ where: { user_id: user.user_id } });
    }

    res.json({ success: true, data: { user, profile } });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
});

export default router;
