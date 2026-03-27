import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { Booking, Farmer } from '../models/index.js';

const router = Router();

// POST /api/bookings — Create booking
router.post('/', authenticate, authorize('farmer'), async (req, res, next) => {
  try {
    const farmer = await Farmer.findOne({ where: { user_id: req.user.user_id } });
    if (!farmer) return res.status(404).json({ success: false, message: 'Farmer profile not found' });

    const { collection_date, collection_time_slot, estimated_quantity_quintals, quality_grade, pickup_location, pickup_lat, pickup_long, notes } = req.body;
    if (!collection_date || !collection_time_slot || !estimated_quantity_quintals) {
      return res.status(400).json({ success: false, message: 'Date, time slot, and quantity are required' });
    }

    // Calculate estimated payment
    const ratePerQuintal = quality_grade === 'A' ? 2000 : quality_grade === 'B' ? 1600 : 1200;
    const payment_amount = estimated_quantity_quintals * ratePerQuintal;

    const booking = await Booking.create({ farmer_id: farmer.farmer_id, collection_date, collection_time_slot, estimated_quantity_quintals, quality_grade, pickup_location: pickup_location || farmer.farm_location_lat, pickup_lat, pickup_long, payment_amount, notes });
    res.status(201).json({ success: true, message: 'Booking created', data: booking });
  } catch (err) { next(err); }
});

// GET /api/bookings — List bookings (farmer or admin)
router.get('/', authenticate, async (req, res, next) => {
  try {
    let where = {};
    if (req.user.user_type === 'farmer') {
      const farmer = await Farmer.findOne({ where: { user_id: req.user.user_id } });
      where.farmer_id = farmer.farmer_id;
    }
    const { status, page = 1, limit = 20 } = req.query;
    if (status) where.status = status;

    const bookings = await Booking.findAndCountAll({
      where, order: [['collection_date', 'DESC']],
      limit: parseInt(limit), offset: (parseInt(page) - 1) * parseInt(limit),
      include: [{ model: Farmer, as: 'farmer', attributes: ['farmer_id'], include: [{ model: (await import('../models/User.js')).default, as: 'user', attributes: ['profile_name', 'phone_number'] }] }],
    });
    res.json({ success: true, data: { bookings: bookings.rows, total: bookings.count, page: parseInt(page), totalPages: Math.ceil(bookings.count / parseInt(limit)) } });
  } catch (err) { next(err); }
});

// GET /api/bookings/:id
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.id, { include: [{ model: Farmer, as: 'farmer' }] });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (err) { next(err); }
});

// PATCH /api/bookings/:id — Update booking status
router.patch('/:id', authenticate, async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    const { status, actual_quantity_quintals, quality_grade, vehicle_id, payment_status, payment_date } = req.body;
    await booking.update({ ...(status && { status }), ...(actual_quantity_quintals && { actual_quantity_quintals }), ...(quality_grade && { quality_grade }), ...(vehicle_id && { vehicle_id }), ...(payment_status && { payment_status }), ...(payment_date && { payment_date }) });
    res.json({ success: true, message: 'Booking updated', data: booking });
  } catch (err) { next(err); }
});

// DELETE /api/bookings/:id — Cancel booking
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (['collected', 'paid'].includes(booking.status)) return res.status(400).json({ success: false, message: 'Cannot cancel this booking' });
    await booking.update({ status: 'cancelled' });
    res.json({ success: true, message: 'Booking cancelled' });
  } catch (err) { next(err); }
});

export default router;
