import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define('Order', {
  order_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  customer_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'customers', key: 'customer_id' } },
  order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.ENUM('pending', 'confirmed', 'manufacturing', 'shipped', 'delivered', 'cancelled'), defaultValue: 'pending' },
  items: { type: DataTypes.JSONB, allowNull: false, defaultValue: [] },
  total_amount: { type: DataTypes.FLOAT, allowNull: false },
  discount: { type: DataTypes.FLOAT, defaultValue: 0 },
  gst: { type: DataTypes.FLOAT, defaultValue: 0 },
  final_amount: { type: DataTypes.FLOAT, allowNull: false },
  payment_status: { type: DataTypes.ENUM('pending', 'completed', 'refunded'), defaultValue: 'pending' },
  payment_method: { type: DataTypes.ENUM('razorpay', 'bank_transfer'), defaultValue: 'razorpay' },
  shipping_address: { type: DataTypes.TEXT },
  estimated_delivery: { type: DataTypes.DATEONLY },
  actual_delivery: { type: DataTypes.DATEONLY },
  tracking_number: { type: DataTypes.STRING },
}, { tableName: 'orders' });

export default Order;
