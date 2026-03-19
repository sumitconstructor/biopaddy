import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { Farmer, User, Booking } from '../models/index.js';

const router = Router();

// GET /api/farmers/profile — Get logged-in farmer's profile
router.get('/profile', authenticate, authorize('farmer'), async (req, res, next) => {
  try {
    const farmer = await Farmer.findOne({ where: { user_id: req.user.user_id }, include: [{ model: User, as: 'user', attributes: ['email', 'phone_number', 'profile_name', 'is_verified'] }] });
    if (!farmer) return res.status(404).json({ success: false, message: 'Farmer profile not found' });
    res.json({ success: true, data: farmer });
  } catch (err) { next(err); }
});

// PUT /api/farmers/profile — Update farmer profile
router.put('/profile', authenticate, authorize('farmer'), async (req, res, next) => {
  try {
    const { profile_name, phone_number, land_area_acres, primary_crop, language_preference, farm_location_lat, farm_location_long, bank_account_number, bank_ifsc } = req.body;
    const farmer = await Farmer.findOne({ where: { user_id: req.user.user_id } });
    if (!farmer) return res.status(404).json({ success: false, message: 'Farmer not found' });

    if (profile_name || phone_number) {
      await User.update({ ...(profile_name && { profile_name }), ...(phone_number && { phone_number }) }, { where: { user_id: req.user.user_id } });
    }
    await farmer.update({ land_area_acres, primary_crop, language_preference, farm_location_lat, farm_location_long, bank_account_number, bank_ifsc });
    res.json({ success: true, message: 'Profile updated', data: farmer });
  } catch (err) { next(err); }
});

// GET /api/farmers/dashboard — Farmer dashboard stats
router.get('/dashboard', authenticate, authorize('farmer'), async (req, res, next) => {
  try {
    const farmer = await Farmer.findOne({ where: { user_id: req.user.user_id } });
    const bookings = await Booking.findAll({ where: { farmer_id: farmer.farmer_id }, order: [['created_at', 'DESC']], limit: 5 });
    const pendingCount = await Booking.count({ where: { farmer_id: farmer.farmer_id, status: 'pending' } });
    const totalQuantity = await Booking.sum('actual_quantity_quintals', { where: { farmer_id: farmer.farmer_id } }) || 0;
    res.json({ success: true, data: { total_earnings: farmer.total_earnings, total_quantity_supplied: totalQuantity, pending_collections: pendingCount, recent_bookings: bookings, rating: farmer.rating } });
  } catch (err) { next(err); }
});

export default router;
