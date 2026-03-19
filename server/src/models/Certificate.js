import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Certificate = sequelize.define('Certificate', {
  certificate_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  order_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'orders', key: 'order_id' } },
  customer_id: { type: DataTypes.UUID, allowNull: false },
  company_name: { type: DataTypes.STRING },
  paddy_diverted_kg: { type: DataTypes.FLOAT, defaultValue: 0 },
  co2_saved_kg: { type: DataTypes.FLOAT, defaultValue: 0 },
  aqi_impact_reduction: { type: DataTypes.FLOAT, defaultValue: 0 },
  certificate_date: { type: DataTypes.DATEONLY },
  validity_end: { type: DataTypes.DATEONLY },
  verification_status: { type: DataTypes.ENUM('pending', 'issued', 'revoked'), defaultValue: 'pending' },
  certificate_file_url: { type: DataTypes.STRING },
}, { tableName: 'certificates' });

export default Certificate;
