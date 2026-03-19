import { Router } from 'express';
import { Op } from 'sequelize';
import { authenticate } from '../middleware/auth.js';
import { Product } from '../models/index.js';

const router = Router();

// GET /api/products — List products with filters
router.get('/', async (req, res, next) => {
  try {
    const { category, search, sort = 'popular', page = 1, limit = 20, available } = req.query;
    let where = {};
    if (category) where.category = category;
    if (available !== undefined) where.is_available = available === 'true';
    if (search) where.product_name = { [Op.iLike]: `%${search}%` };

    let order = [['reviews_count', 'DESC']]; // popular
    if (sort === 'price_low') order = [['unit_price_rupees', 'ASC']];
    else if (sort === 'price_high') order = [['unit_price_rupees', 'DESC']];
    else if (sort === 'newest') order = [['created_at', 'DESC']];
    else if (sort === 'rating') order = [['rating', 'DESC']];

    const products = await Product.findAndCountAll({
      where, order, limit: parseInt(limit), offset: (parseInt(page) - 1) * parseInt(limit),
    });
    res.json({ success: true, data: { products: products.rows, total: products.count, page: parseInt(page), totalPages: Math.ceil(products.count / parseInt(limit)) } });
  } catch (err) { next(err); }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
});

// POST /api/products — Admin create product
router.post('/', authenticate, async (req, res, next) => {
  try {
    if (req.user.user_type !== 'admin') return res.status(403).json({ success: false, message: 'Admin only' });
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, message: 'Product created', data: product });
  } catch (err) { next(err); }
});

// PUT /api/products/:id — Admin update product
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    if (req.user.user_type !== 'admin') return res.status(403).json({ success: false, message: 'Admin only' });
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    await product.update(req.body);
    res.json({ success: true, message: 'Product updated', data: product });
  } catch (err) { next(err); }
});

export default router;
