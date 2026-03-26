/**
 * FILE: server/src/routes/farmer.routes.js
 *
 * Changes from original:
 *   - /dashboard now returns real DB data grouped by month for the earnings chart.
 *   - Regex validation on bank account + IFSC in profile update.
 */

import { Router } from 'express';
import { Op, fn, col, literal } from 'sequelize';
import { authenticate, authorize } from '../middleware/auth.js';
import { Farmer, User, Booking } from '../models/index.js';

const router = Router();

const REGEX = {
  bankAccount: /^[0-9]{9,18}$/,
  ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/farmers/profile
// ─────────────────────────────────────────────────────────────────────────────
router.get('/profile', authenticate, authorize('farmer'), async (req, res, next) => {
  try {
    const farmer = await Farmer.findOne({
      where: { user_id: req.user.user_id },
      include: [{
        model: User,
        as: 'user',
        attributes: ['email', 'profile_name', 'is_verified', 'created_at'],
      }],
    });
    if (!farmer) return res.status(404).json({ success: false, message: 'Farmer profile not found.' });
    res.json({ success: true, data: farmer });
  } catch (err) { next(err); }
});

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/farmers/profile
// ─────────────────────────────────────────────────────────────────────────────
router.put('/profile', authenticate, authorize('farmer'), async (req, res, next) => {
  try {
    const {
      profile_name, land_area_acres, primary_crop,
      language_preference, farm_location_lat, farm_location_long,
      bank_account_number, bank_ifsc,
    } = req.body;

    const errors = [];
    if (bank_account_number && !REGEX.bankAccount.test(bank_account_number))
      errors.push('Bank account number must be 9–18 digits.');
    if (bank_ifsc && !REGEX.ifsc.test(bank_ifsc.toUpperCase()))
      errors.push('IFSC code format is invalid (e.g. SBIN0001234).');
    if (errors.length)
      return res.status(422).json({ success: false, message: 'Validation failed.', errors });

    const farmer = await Farmer.findOne({ where: { user_id: req.user.user_id } });
    if (!farmer) return res.status(404).json({ success: false, message: 'Farmer not found.' });

    if (profile_name) {
      await User.update({ profile_name: profile_name.trim() }, { where: { user_id: req.user.user_id } });
    }
    await farmer.update({
      land_area_acres, primary_crop, language_preference,
      farm_location_lat, farm_location_long,
      ...(bank_account_number && { bank_account_number }),
      ...(bank_ifsc && { bank_ifsc: bank_ifsc.toUpperCase() }),
    });

    res.json({ success: true, message: 'Profile updated successfully.', data: farmer });
  } catch (err) { next(err); }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/farmers/dashboard
// Returns: real stats + last 5 bookings + monthly earnings (12 months)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/dashboard', authenticate, authorize('farmer'), async (req, res, next) => {
  try {
    const farmer = await Farmer.findOne({ where: { user_id: req.user.user_id } });
    if (!farmer) return res.status(404).json({ success: false, message: 'Farmer profile not found.' });

    // Recent bookings (last 5)
    const recentBookings = await Booking.findAll({
      where: { farmer_id: farmer.farmer_id },
      order: [['created_at', 'DESC']],
      limit: 5,
    });

    // Aggregate counts
    const pendingCount = await Booking.count({
      where: { farmer_id: farmer.farmer_id, status: 'pending' },
    });

    const totalQuantity = (await Booking.sum('actual_quantity_quintals', {
      where: { farmer_id: farmer.farmer_id },
    })) || 0;

    // Next upcoming collection date
    const nextBooking = await Booking.findOne({
      where: {
        farmer_id: farmer.farmer_id,
        status: { [Op.in]: ['confirmed', 'pending'] },
        collection_date: { [Op.gte]: new Date() },
      },
      order: [['collection_date', 'ASC']],
    });

    // Monthly earnings for chart — last 12 months
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
    twelveMonthsAgo.setDate(1);

    const monthlyRows = await Booking.findAll({
      attributes: [
        [fn('TO_CHAR', col('collection_date'), 'Mon'), 'month'],
        [fn('TO_CHAR', col('collection_date'), 'YYYY-MM'), 'sort_key'],
        [fn('COALESCE', fn('SUM', col('payment_amount')), 0), 'earnings'],
      ],
      where: {
        farmer_id: farmer.farmer_id,
        status: 'paid',
        collection_date: { [Op.gte]: twelveMonthsAgo },
      },
      group: [literal("TO_CHAR(collection_date, 'Mon')"), literal("TO_CHAR(collection_date, 'YYYY-MM')")],
      order: [[literal("TO_CHAR(collection_date, 'YYYY-MM')"), 'ASC']],
      raw: true,
    });

    const earningsChart = monthlyRows.map(r => ({
      month: r.month,
      earnings: parseFloat(r.earnings),
    }));

    res.json({
      success: true,
      data: {
        total_earnings: farmer.total_earnings || 0,
        total_quantity_supplied: totalQuantity,
        pending_collections: pendingCount,
        next_collection_date: nextBooking?.collection_date || null,
        rating: farmer.rating || 0,
        verified_by_admin: farmer.verified_by_admin,
        recent_bookings: recentBookings,
        earnings_chart: earningsChart,
      },
    });
  } catch (err) { next(err); }
});

export default router;
