import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { User, Farmer, Customer, Booking, Order, Transaction, Product } from '../models/index.js';
import sequelize from '../config/database.js';

const router = Router();

// GET /api/admin/dashboard — Overview stats
router.get('/dashboard', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const totalFarmers = await Farmer.count();
    const pendingFarmers = await Farmer.count({ where: { verified_by_admin: false } });
    const totalCustomers = await Customer.count();
    const totalOrders = await Order.count();
    const pendingOrders = await Order.count({ where: { status: 'pending' } });
    const totalRevenue = await Transaction.sum('amount_rupees', { where: { transaction_type: 'customer_charge', transaction_status: 'completed' } }) || 0;
    const totalPayouts = await Transaction.sum('amount_rupees', { where: { transaction_type: 'farmer_payout', transaction_status: 'completed' } }) || 0;
    const pendingPayouts = await Transaction.sum('amount_rupees', { where: { transaction_type: 'farmer_payout', transaction_status: 'pending' } }) || 0;

    res.json({ success: true, data: { totalFarmers, pendingFarmers, totalCustomers, totalOrders, pendingOrders, totalRevenue, totalPayouts, pendingPayouts, netProfit: totalRevenue - totalPayouts } });
  } catch (err) { next(err); }
});

// GET /api/admin/farmers — List all farmers
router.get('/farmers', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { verified, search, page = 1, limit = 20 } = req.query;
    let where = {};
    if (verified !== undefined) where.verified_by_admin = verified === 'true';

    const farmers = await Farmer.findAndCountAll({
      where, limit: parseInt(limit), offset: (parseInt(page) - 1) * parseInt(limit),
      include: [{ model: User, as: 'user', attributes: ['profile_name', 'email', 'phone_number', 'is_active'] }],
      order: [['created_at', 'DESC']],
    });
    res.json({ success: true, data: { farmers: farmers.rows, total: farmers.count } });
  } catch (err) { next(err); }
});

// PATCH /api/admin/farmers/:id/verify — Verify farmer
router.patch('/farmers/:id/verify', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const farmer = await Farmer.findByPk(req.params.id);
    if (!farmer) return res.status(404).json({ success: false, message: 'Farmer not found' });
    await farmer.update({ verified_by_admin: true });
    await User.update({ is_verified: true }, { where: { user_id: farmer.user_id } });
    res.json({ success: true, message: 'Farmer verified' });
  } catch (err) { next(err); }
});

// PATCH /api/admin/farmers/:id/reject — Reject farmer
router.patch('/farmers/:id/reject', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const farmer = await Farmer.findByPk(req.params.id);
    if (!farmer) return res.status(404).json({ success: false, message: 'Farmer not found' });
    await User.update({ is_active: false }, { where: { user_id: farmer.user_id } });
    res.json({ success: true, message: 'Farmer rejected' });
  } catch (err) { next(err); }
});

// GET /api/admin/finance — Financial overview
router.get('/finance', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({ order: [['created_at', 'DESC']], limit: 50 });
    const revenue = await Transaction.sum('amount_rupees', { where: { transaction_type: 'customer_charge', transaction_status: 'completed' } }) || 0;
    const payouts = await Transaction.sum('amount_rupees', { where: { transaction_type: 'farmer_payout', transaction_status: 'completed' } }) || 0;
    const pendingPayouts = await Transaction.sum('amount_rupees', { where: { transaction_type: 'farmer_payout', transaction_status: 'pending' } }) || 0;
    res.json({ success: true, data: { revenue, payouts, pendingPayouts, netProfit: revenue - payouts, transactions } });
  } catch (err) { next(err); }
});

// POST /api/admin/payouts/:bookingId — Process farmer payout
router.post('/payouts/:bookingId', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking || booking.status !== 'collected') return res.status(400).json({ success: false, message: 'Booking not eligible for payout' });

    const farmer = await Farmer.findByPk(booking.farmer_id);
    await Transaction.create({ transaction_type: 'farmer_payout', user_id: farmer.user_id, booking_id: booking.booking_id, amount_rupees: booking.payment_amount, payment_gateway: 'bank_transfer', transaction_status: 'completed' });
    await booking.update({ status: 'paid', payment_status: 'completed', payment_date: new Date() });
    await farmer.update({ total_earnings: farmer.total_earnings + booking.payment_amount });

    res.json({ success: true, message: 'Payout processed', data: { amount: booking.payment_amount } });
  } catch (err) { next(err); }
});

// GET /api/admin/inventory — Product inventory
router.get('/inventory', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const products = await Product.findAll({ order: [['quantity_in_stock', 'ASC']] });
    const lowStock = products.filter(p => p.quantity_in_stock < 2000);
    res.json({ success: true, data: { products, lowStockCount: lowStock.length, lowStockProducts: lowStock } });
  } catch (err) { next(err); }
});

export default router;
