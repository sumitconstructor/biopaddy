/**
 * FILE: server/src/routes/customer.routes.js  (NEW FILE — wire it in server/src/index.js)
 *
 * Provides:
 *   GET /api/customers/dashboard  — real stats for CustomerDashboard
 *   GET /api/customers/profile    — full profile
 */

import { Router } from 'express';
import { Op, fn, col, literal } from 'sequelize';
import { authenticate, authorize } from '../middleware/auth.js';
import { Customer, User, Order } from '../models/index.js';

const router = Router();

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/customers/profile
// ─────────────────────────────────────────────────────────────────────────────
router.get('/profile', authenticate, authorize('customer'), async (req, res, next) => {
  try {
    const customer = await Customer.findOne({
      where: { user_id: req.user.user_id },
      include: [{
        model: User,
        as: 'user',
        attributes: ['email', 'profile_name', 'is_verified', 'created_at'],
      }],
    });
    if (!customer) return res.status(404).json({ success: false, message: 'Customer profile not found.' });
    res.json({ success: true, data: customer });
  } catch (err) { next(err); }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/customers/dashboard
// ─────────────────────────────────────────────────────────────────────────────
router.get('/dashboard', authenticate, authorize('customer'), async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ where: { user_id: req.user.user_id } });
    if (!customer) return res.status(404).json({ success: false, message: 'Customer profile not found.' });

    // Recent 4 orders
    const recentOrders = await Order.findAll({
      where: { customer_id: customer.customer_id },
      order: [['created_at', 'DESC']],
      limit: 4,
    });

    // Active orders
    const activeOrders = await Order.count({
      where: {
        customer_id: customer.customer_id,
        status: { [Op.in]: ['pending', 'confirmed', 'manufacturing', 'shipped'] },
      },
    });

    // Total spent
    const totalSpent = (await Order.sum('final_amount', {
      where: { customer_id: customer.customer_id, status: 'delivered' },
    })) || 0;

    // CO₂ saved: each delivered order item represents paddy diverted from burning.
    // Rough coefficient: 1 kg paddy straw → 1.5 kg CO₂ avoided (adjust per domain logic).
    const deliveredOrders = await Order.findAll({
      where: { customer_id: customer.customer_id, status: 'delivered' },
      attributes: ['total_quantity_kg'],
      raw: true,
    });
    const totalKg = deliveredOrders.reduce((s, o) => s + (o.total_quantity_kg || 0), 0);
    const co2Saved = Math.round(totalKg * 1.5);

    // Next delivery date
    const nextOrder = await Order.findOne({
      where: {
        customer_id: customer.customer_id,
        status: { [Op.in]: ['confirmed', 'shipped'] },
        expected_delivery: { [Op.gte]: new Date() },
      },
      order: [['expected_delivery', 'ASC']],
    });

    // Monthly CO₂ chart — last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const monthlyRows = await Order.findAll({
      attributes: [
        [fn('TO_CHAR', col('created_at'), 'Mon'), 'month'],
        [fn('TO_CHAR', col('created_at'), 'YYYY-MM'), 'sort_key'],
        [fn('COALESCE', fn('SUM', col('total_quantity_kg')), 0), 'qty'],
      ],
      where: {
        customer_id: customer.customer_id,
        status: 'delivered',
        created_at: { [Op.gte]: sixMonthsAgo },
      },
      group: [literal("TO_CHAR(created_at, 'Mon')"), literal("TO_CHAR(created_at, 'YYYY-MM')")],
      order: [[literal("TO_CHAR(created_at, 'YYYY-MM')"), 'ASC']],
      raw: true,
    });

    const co2Chart = monthlyRows.map(r => ({
      month: r.month,
      co2: Math.round(parseFloat(r.qty) * 1.5),
    }));

    res.json({
      success: true,
      data: {
        company_name: customer.company_name,
        active_orders: activeOrders,
        total_spent: totalSpent,
        co2_saved_kg: co2Saved,
        paddy_diverted_kg: totalKg,
        next_delivery_date: nextOrder?.expected_delivery || null,
        recent_orders: recentOrders,
        co2_chart: co2Chart,
      },
    });
  } catch (err) { next(err); }
});

export default router;
