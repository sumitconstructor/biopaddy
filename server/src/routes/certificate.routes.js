import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { Certificate, Order, Customer } from '../models/index.js';

const router = Router();

// GET /api/certificates — List certificates (customer or admin)
router.get('/', authenticate, async (req, res, next) => {
  try {
    let where = {};
    if (req.user.user_type === 'customer') {
      const customer = await Customer.findOne({ where: { user_id: req.user.user_id } });
      where.customer_id = customer.customer_id;
    }
    const certificates = await Certificate.findAll({ where, order: [['created_at', 'DESC']], include: [{ model: Order, as: 'order', attributes: ['order_id', 'order_date', 'final_amount'] }] });
    res.json({ success: true, data: certificates });
  } catch (err) { next(err); }
});

// POST /api/certificates — Generate certificate for order (admin)
router.post('/', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { order_id } = req.body;
    const order = await Order.findByPk(order_id, { include: [{ model: Customer, as: 'customer' }] });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    // Calculate environmental impact
    const totalUnits = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const paddy_diverted_kg = Math.round(totalUnits * 0.05);
    const co2_saved_kg = Math.round(paddy_diverted_kg * 1.5);
    const aqi_impact_reduction = parseFloat((paddy_diverted_kg * 0.00008).toFixed(4));

    const cert = await Certificate.create({ order_id, customer_id: order.customer_id, company_name: order.customer.company_name, paddy_diverted_kg, co2_saved_kg, aqi_impact_reduction, certificate_date: new Date(), validity_end: new Date(Date.now() + 365 * 86400000), verification_status: 'issued' });
    res.status(201).json({ success: true, message: 'Certificate issued', data: cert });
  } catch (err) { next(err); }
});

// PATCH /api/certificates/:id — Verify/update certificate (admin)
router.patch('/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const cert = await Certificate.findByPk(req.params.id);
    if (!cert) return res.status(404).json({ success: false, message: 'Certificate not found' });
    const { verification_status, certificate_file_url } = req.body;
    await cert.update({ ...(verification_status && { verification_status }), ...(certificate_file_url && { certificate_file_url }), ...(verification_status === 'issued' && { certificate_date: new Date() }) });
    res.json({ success: true, message: 'Certificate updated', data: cert });
  } catch (err) { next(err); }
});

export default router;
