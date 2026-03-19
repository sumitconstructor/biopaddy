import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { Order, Customer, Product, Transaction } from '../models/index.js';

const router = Router();

// POST /api/orders — Place order
router.post('/', authenticate, authorize('customer'), async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ where: { user_id: req.user.user_id } });
    if (!customer) return res.status(404).json({ success: false, message: 'Customer profile not found' });

    const { items, shipping_address, payment_method } = req.body;
    if (!items?.length) return res.status(400).json({ success: false, message: 'Order items required' });

    // Calculate amounts
    let total_amount = 0;
    const processedItems = [];
    for (const item of items) {
      const product = await Product.findByPk(item.product_id);
      if (!product) return res.status(400).json({ success: false, message: `Product ${item.product_id} not found` });
      const lineTotal = product.unit_price_rupees * item.quantity;
      total_amount += lineTotal;
      processedItems.push({ product_id: product.product_id, name: product.product_name, quantity: item.quantity, unit_price: product.unit_price_rupees, total: lineTotal });
    }

    const discount = total_amount > 50000 ? total_amount * 0.15 : total_amount > 10000 ? total_amount * 0.12 : 0;
    const gst = (total_amount - discount) * 0.18;
    const final_amount = total_amount - discount + gst;

    const order = await Order.create({ customer_id: customer.customer_id, items: processedItems, total_amount, discount, gst, final_amount, shipping_address, payment_method: payment_method || 'razorpay', estimated_delivery: new Date(Date.now() + 14 * 86400000) });

    // Update customer stats
    await customer.update({ total_orders: customer.total_orders + 1, total_spent: customer.total_spent + final_amount });

    // Create transaction
    await Transaction.create({ transaction_type: 'customer_charge', user_id: req.user.user_id, order_id: order.order_id, amount_rupees: final_amount, payment_gateway: payment_method || 'razorpay', transaction_status: 'completed' });

    res.status(201).json({ success: true, message: 'Order placed', data: order });
  } catch (err) { next(err); }
});

// GET /api/orders — List orders
router.get('/', authenticate, async (req, res, next) => {
  try {
    let where = {};
    if (req.user.user_type === 'customer') {
      const customer = await Customer.findOne({ where: { user_id: req.user.user_id } });
      where.customer_id = customer.customer_id;
    }
    const { status, page = 1, limit = 20 } = req.query;
    if (status) where.status = status;

    const orders = await Order.findAndCountAll({
      where, order: [['created_at', 'DESC']],
      limit: parseInt(limit), offset: (parseInt(page) - 1) * parseInt(limit),
      include: [{ model: Customer, as: 'customer', attributes: ['company_name', 'contact_person'] }],
    });
    res.json({ success: true, data: { orders: orders.rows, total: orders.count, page: parseInt(page), totalPages: Math.ceil(orders.count / parseInt(limit)) } });
  } catch (err) { next(err); }
});

// GET /api/orders/:id
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [{ model: Customer, as: 'customer' }] });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (err) { next(err); }
});

// PATCH /api/orders/:id — Update order status (admin)
router.patch('/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    const { status, tracking_number, actual_delivery, payment_status } = req.body;
    await order.update({ ...(status && { status }), ...(tracking_number && { tracking_number }), ...(actual_delivery && { actual_delivery }), ...(payment_status && { payment_status }) });
    res.json({ success: true, message: 'Order updated', data: order });
  } catch (err) { next(err); }
});

export default router;
