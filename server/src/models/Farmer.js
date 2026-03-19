import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Farmer = sequelize.define('Farmer', {
  farmer_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'user_id' } },
  aadhaar_number: { type: DataTypes.STRING },
  land_area_acres: { type: DataTypes.FLOAT },
  farm_location_lat: { type: DataTypes.FLOAT },
  farm_location_long: { type: DataTypes.FLOAT },
  primary_crop: { type: DataTypes.ENUM('rice', 'wheat', 'both'), defaultValue: 'rice' },
  language_preference: { type: DataTypes.ENUM('hindi', 'english', 'punjabi'), defaultValue: 'hindi' },
  bank_account_number: { type: DataTypes.STRING },
  bank_ifsc: { type: DataTypes.STRING(11) },
  total_earnings: { type: DataTypes.FLOAT, defaultValue: 0 },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  verified_by_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'farmers' });

export default Farmer;
