import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Farmer, Customer } from '../models/index.js';

const router = Router();

function generateTokens(user) {
  const payload = { user_id: user.user_id, user_type: user.user_type, profile_name: user.profile_name };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY || '24h' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d' });
  return { token, refreshToken };
}

// POST /api/auth/register/farmer
router.post('/register/farmer', async (req, res, next) => {
  try {
    const { phone_number, profile_name, password, aadhaar_number, land_area_acres, primary_crop, language_preference, farm_location_lat, farm_location_long, bank_account_number, bank_ifsc } = req.body;
    if (!phone_number || !profile_name || !password) return res.status(400).json({ success: false, message: 'Phone, name, and password are required' });

    const exists = await User.findOne({ where: { phone_number } });
    if (exists) return res.status(409).json({ success: false, message: 'Phone number already registered' });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ phone_number, profile_name, password_hash, user_type: 'farmer' });
    const farmer = await Farmer.create({ user_id: user.user_id, aadhaar_number, land_area_acres, primary_crop, language_preference, farm_location_lat, farm_location_long, bank_account_number, bank_ifsc });

    const tokens = generateTokens(user);
    res.status(201).json({ success: true, message: 'Farmer registered', data: { user: { user_id: user.user_id, profile_name: user.profile_name, user_type: user.user_type }, farmer_id: farmer.farmer_id, ...tokens } });
  } catch (err) { next(err); }
});

// POST /api/auth/register/customer
router.post('/register/customer', async (req, res, next) => {
  try {
    const { email, profile_name, password, company_name, business_type, gst_number, contact_person, phone_number, shipping_address } = req.body;
    if (!email || !profile_name || !password || !company_name) return res.status(400).json({ success: false, message: 'Email, name, password, and company name are required' });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ success: false, message: 'Email already registered' });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, phone_number, profile_name, password_hash, user_type: 'customer', is_verified: true });
    const customer = await Customer.create({ user_id: user.user_id, company_name, business_type, gst_number, contact_person, shipping_address });

    const tokens = generateTokens(user);
    res.status(201).json({ success: true, message: 'Customer registered', data: { user: { user_id: user.user_id, profile_name: user.profile_name, user_type: user.user_type }, customer_id: customer.customer_id, ...tokens } });
  } catch (err) { next(err); }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, phone_number, password } = req.body;
    let user;
    if (email) user = await User.findOne({ where: { email } });
    else if (phone_number) user = await User.findOne({ where: { phone_number } });
    else return res.status(400).json({ success: false, message: 'Email or phone number required' });

    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    if (!user.is_active) return res.status(403).json({ success: false, message: 'Account suspended' });

    // Load profile
    let profile = null;
    if (user.user_type === 'farmer') profile = await Farmer.findOne({ where: { user_id: user.user_id } });
    else if (user.user_type === 'customer') profile = await Customer.findOne({ where: { user_id: user.user_id } });

    const tokens = generateTokens(user);
    res.json({ success: true, data: { user: { user_id: user.user_id, profile_name: user.profile_name, email: user.email, phone_number: user.phone_number, user_type: user.user_type, is_verified: user.is_verified }, profile, ...tokens } });
  } catch (err) { next(err); }
});

// POST /api/auth/refresh
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ success: false, message: 'Refresh token required' });
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const tokens = generateTokens({ user_id: decoded.user_id, user_type: decoded.user_type, profile_name: decoded.profile_name });
    res.json({ success: true, data: tokens });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid refresh token' });
  }
});

// POST /api/auth/send-otp (mock)
router.post('/send-otp', (req, res) => {
  const { phone_number } = req.body;
  if (!phone_number) return res.status(400).json({ success: false, message: 'Phone number required' });
  res.json({ success: true, message: 'OTP sent (mock: 123456)', data: { otp_sent: true } });
});

// POST /api/auth/verify-otp (mock)
router.post('/verify-otp', (req, res) => {
  const { phone_number, otp } = req.body;
  if (otp === '123456') return res.json({ success: true, message: 'OTP verified', data: { verified: true } });
  return res.status(400).json({ success: false, message: 'Invalid OTP' });
});

export default router;
