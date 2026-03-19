import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Booking = sequelize.define('Booking', {
  booking_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  farmer_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'farmers', key: 'farmer_id' } },
  collection_date: { type: DataTypes.DATEONLY, allowNull: false },
  collection_time_slot: { type: DataTypes.ENUM('morning', 'afternoon', 'evening'), allowNull: false },
  estimated_quantity_quintals: { type: DataTypes.FLOAT, allowNull: false },
  actual_quantity_quintals: { type: DataTypes.FLOAT },
  quality_grade: { type: DataTypes.ENUM('A', 'B', 'C') },
  pickup_location: { type: DataTypes.TEXT },
  pickup_lat: { type: DataTypes.FLOAT },
  pickup_long: { type: DataTypes.FLOAT },
  status: { type: DataTypes.ENUM('pending', 'confirmed', 'collected', 'paid', 'cancelled'), defaultValue: 'pending' },
  payment_amount: { type: DataTypes.FLOAT },
  payment_status: { type: DataTypes.ENUM('pending', 'completed', 'failed'), defaultValue: 'pending' },
  payment_date: { type: DataTypes.DATE },
  vehicle_id: { type: DataTypes.UUID },
  notes: { type: DataTypes.TEXT },
}, { tableName: 'bookings' });

export default Booking;
