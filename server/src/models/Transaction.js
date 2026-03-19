import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Transaction = sequelize.define('Transaction', {
  transaction_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  transaction_type: { type: DataTypes.ENUM('farmer_payout', 'customer_charge', 'refund'), allowNull: false },
  user_id: { type: DataTypes.UUID, allowNull: false },
  booking_id: { type: DataTypes.UUID },
  order_id: { type: DataTypes.UUID },
  amount_rupees: { type: DataTypes.FLOAT, allowNull: false },
  payment_gateway: { type: DataTypes.ENUM('razorpay', 'bank_transfer'), defaultValue: 'bank_transfer' },
  gateway_transaction_id: { type: DataTypes.STRING },
  transaction_status: { type: DataTypes.ENUM('pending', 'completed', 'failed'), defaultValue: 'pending' },
}, { tableName: 'transactions' });

export default Transaction;
