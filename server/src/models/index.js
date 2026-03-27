import User from './User.js';
import Farmer from './Farmer.js';
import Customer from './Customer.js';
import Product from './Product.js';
import Booking from './Booking.js';
import Order from './Order.js';
import Transaction from './Transaction.js';
import Certificate from './Certificate.js';

// ============ Associations ============

// User <-> Farmer (1:1)
User.hasOne(Farmer, { foreignKey: 'user_id', as: 'farmer' });
Farmer.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// User <-> Customer (1:1)
User.hasOne(Customer, { foreignKey: 'user_id', as: 'customer' });
Customer.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Farmer <-> Booking (1:M)
Farmer.hasMany(Booking, { foreignKey: 'farmer_id', as: 'bookings' });
Booking.belongsTo(Farmer, { foreignKey: 'farmer_id', as: 'farmer' });

// Customer <-> Order (1:M)
Customer.hasMany(Order, { foreignKey: 'customer_id', as: 'orders' });
Order.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

// Order <-> Certificate (1:1)
Order.hasOne(Certificate, { foreignKey: 'order_id', as: 'certificate' });
Certificate.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

export { User, Farmer, Customer, Product, Booking, Order, Transaction, Certificate };
