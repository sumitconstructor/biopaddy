import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  user_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: true },
  phone_number: { type: DataTypes.STRING(15), unique: true, allowNull: true },
  password_hash: { type: DataTypes.STRING },
  user_type: { type: DataTypes.ENUM('farmer', 'customer', 'admin'), allowNull: false },
  profile_name: { type: DataTypes.STRING, allowNull: false },
  is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'users' });

export default User;
