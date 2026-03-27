import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Customer = sequelize.define('Customer', {
  customer_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'user_id' } },
  company_name: { type: DataTypes.STRING, allowNull: false },
  business_type: { type: DataTypes.STRING },
  gst_number: { type: DataTypes.STRING(15) },
  contact_person: { type: DataTypes.STRING },
  shipping_address: { type: DataTypes.TEXT },
  total_orders: { type: DataTypes.INTEGER, defaultValue: 0 },
  total_spent: { type: DataTypes.FLOAT, defaultValue: 0 },
}, { tableName: 'customers' });

export default Customer;
