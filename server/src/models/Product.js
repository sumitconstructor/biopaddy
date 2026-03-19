import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  product_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  product_name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.ENUM('cups', 'plates', 'bowls', 'spoons', 'containers'), allowNull: false },
  description: { type: DataTypes.TEXT },
  size_ml: { type: DataTypes.INTEGER },
  unit_price_rupees: { type: DataTypes.FLOAT, allowNull: false },
  bulk_discount_percentage: { type: DataTypes.FLOAT, defaultValue: 0 },
  quantity_in_stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  manufacturing_lead_time_days: { type: DataTypes.INTEGER, defaultValue: 7 },
  is_available: { type: DataTypes.BOOLEAN, defaultValue: true },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  reviews_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  specs: { type: DataTypes.JSONB, defaultValue: {} },
  image_url: { type: DataTypes.STRING },
}, { tableName: 'products' });

export default Product;
