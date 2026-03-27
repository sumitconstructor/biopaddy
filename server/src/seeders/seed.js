import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import sequelize from '../config/database.js';
import { User, Farmer, Customer, Product, Booking, Order, Transaction, Certificate } from '../models/index.js';

dotenv.config();

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');
    await sequelize.sync({ force: true });
    console.log('🔄 Tables recreated');

    const hash = await bcrypt.hash('password123', 10);

    // ============ Users & Profiles ============
    const admin = await User.create({ email: 'admin@biopaddy.com', phone_number: '+919000000000', password_hash: hash, user_type: 'admin', profile_name: 'Arun Kapoor', is_verified: true });

    const farmerUsers = await User.bulkCreate([
      { email: 'rajesh@mail.com', phone_number: '+919876543210', password_hash: hash, user_type: 'farmer', profile_name: 'Rajesh Kumar', is_verified: true },
      { email: 'sukhdev@mail.com', phone_number: '+919876543211', password_hash: hash, user_type: 'farmer', profile_name: 'Sukhdev Singh', is_verified: true },
      { email: 'anita@mail.com', phone_number: '+919876543212', password_hash: hash, user_type: 'farmer', profile_name: 'Anita Devi', is_verified: true },
      { email: 'harpreet@mail.com', phone_number: '+919876543213', password_hash: hash, user_type: 'farmer', profile_name: 'Harpreet Kaur', is_verified: false },
    ]);

    const farmers = await Farmer.bulkCreate([
      { user_id: farmerUsers[0].user_id, aadhaar_number: '****5678', land_area_acres: 12, primary_crop: 'rice', language_preference: 'hindi', total_earnings: 185000, rating: 4.5, verified_by_admin: true },
      { user_id: farmerUsers[1].user_id, aadhaar_number: '****9012', land_area_acres: 18, primary_crop: 'wheat', language_preference: 'punjabi', total_earnings: 243000, rating: 4.8, verified_by_admin: true },
      { user_id: farmerUsers[2].user_id, aadhaar_number: '****3456', land_area_acres: 8, primary_crop: 'both', language_preference: 'hindi', total_earnings: 92000, rating: 4.2, verified_by_admin: true },
      { user_id: farmerUsers[3].user_id, aadhaar_number: '****7890', land_area_acres: 25, primary_crop: 'rice', language_preference: 'punjabi', total_earnings: 0, rating: 0, verified_by_admin: false },
    ]);

    const customerUsers = await User.bulkCreate([
      { email: 'greenplate@corp.com', phone_number: '+919800000001', password_hash: hash, user_type: 'customer', profile_name: 'GreenPlate Foods', is_verified: true },
      { email: 'ecohotel@corp.com', phone_number: '+919800000002', password_hash: hash, user_type: 'customer', profile_name: 'EcoStay Hotels', is_verified: true },
    ]);

    const customers = await Customer.bulkCreate([
      { user_id: customerUsers[0].user_id, company_name: 'GreenPlate Foods Pvt Ltd', business_type: 'QSR', gst_number: '07AABCG1234L1ZG', contact_person: 'Vikram Mehta', total_orders: 24, total_spent: 485000 },
      { user_id: customerUsers[1].user_id, company_name: 'EcoStay Hotels & Resorts', business_type: 'Hotel', gst_number: '09AABCE5678M2ZH', contact_person: 'Priya Sharma', total_orders: 15, total_spent: 890000 },
    ]);

    // ============ Products ============
    const products = await Product.bulkCreate([
      { product_name: 'Eco Cup 200ml', category: 'cups', size_ml: 200, unit_price_rupees: 4.5, bulk_discount_percentage: 15, quantity_in_stock: 15000, manufacturing_lead_time_days: 5, description: 'Biodegradable cup from rice paddy straw.', is_available: true, rating: 4.7, reviews_count: 128, specs: { material: '100% Paddy Straw Fiber', weight: '12g', heatResistant: 'Up to 85°C', compostable: '90 days' } },
      { product_name: 'Eco Cup 350ml', category: 'cups', size_ml: 350, unit_price_rupees: 6, bulk_discount_percentage: 15, quantity_in_stock: 12000, manufacturing_lead_time_days: 5, description: 'Large cup for coffee, tea, and smoothies.', is_available: true, rating: 4.6, reviews_count: 95, specs: { material: '100% Paddy Straw Fiber', weight: '16g' } },
      { product_name: 'Round Plate 8"', category: 'plates', unit_price_rupees: 5, bulk_discount_percentage: 12, quantity_in_stock: 20000, manufacturing_lead_time_days: 4, description: '8-inch plate from wheat straw.', is_available: true, rating: 4.8, reviews_count: 210, specs: { material: '100% Wheat Straw Fiber', weight: '25g' } },
      { product_name: 'Round Plate 10"', category: 'plates', unit_price_rupees: 7, bulk_discount_percentage: 12, quantity_in_stock: 18000, manufacturing_lead_time_days: 4, description: '10-inch dinner plate.', is_available: true, rating: 4.9, reviews_count: 175 },
      { product_name: 'Eco Spoon', category: 'spoons', unit_price_rupees: 2, bulk_discount_percentage: 20, quantity_in_stock: 50000, manufacturing_lead_time_days: 3, description: 'Sturdy biodegradable spoon.', is_available: true, rating: 4.5, reviews_count: 320 },
      { product_name: 'Deep Bowl 500ml', category: 'bowls', size_ml: 500, unit_price_rupees: 8, bulk_discount_percentage: 10, quantity_in_stock: 10000, manufacturing_lead_time_days: 6, description: 'Deep bowl for soups and salads.', is_available: true, rating: 4.7, reviews_count: 88 },
      { product_name: 'Food Container 750ml', category: 'containers', size_ml: 750, unit_price_rupees: 12, bulk_discount_percentage: 10, quantity_in_stock: 5000, manufacturing_lead_time_days: 7, description: 'Sealable takeaway container.', is_available: true, rating: 4.8, reviews_count: 45 },
    ]);

    // ============ Bookings ============
    await Booking.bulkCreate([
      { farmer_id: farmers[0].farmer_id, collection_date: '2026-03-15', collection_time_slot: 'morning', estimated_quantity_quintals: 12, actual_quantity_quintals: 11.5, quality_grade: 'A', status: 'paid', payment_amount: 23000, payment_status: 'completed', payment_date: new Date('2026-03-16'), pickup_location: 'Village Kheri, Punjab' },
      { farmer_id: farmers[1].farmer_id, collection_date: '2026-03-18', collection_time_slot: 'afternoon', estimated_quantity_quintals: 20, actual_quantity_quintals: 19, quality_grade: 'A', status: 'collected', payment_amount: 38000, payment_status: 'pending', pickup_location: 'Shimla Road, HP' },
      { farmer_id: farmers[2].farmer_id, collection_date: '2026-03-20', collection_time_slot: 'morning', estimated_quantity_quintals: 8, quality_grade: 'B', status: 'confirmed', payment_amount: 12800, payment_status: 'pending', pickup_location: 'Dehradun, Uttarakhand' },
      { farmer_id: farmers[0].farmer_id, collection_date: '2026-03-28', collection_time_slot: 'afternoon', estimated_quantity_quintals: 10, quality_grade: 'B', status: 'pending', payment_amount: 16000, payment_status: 'pending', pickup_location: 'Village Kheri, Punjab' },
    ]);

    // ============ Orders ============
    const order1 = await Order.create({ customer_id: customers[0].customer_id, order_date: new Date('2026-03-01'), status: 'delivered', items: [{ name: 'Eco Cup 200ml', quantity: 5000, unit_price: 4.5, total: 22500 }, { name: 'Eco Spoon', quantity: 5000, unit_price: 2, total: 10000 }], total_amount: 32500, discount: 4875, gst: 4973, final_amount: 32598, payment_status: 'completed', payment_method: 'razorpay', shipping_address: '12 MG Road, Gurugram', estimated_delivery: '2026-03-10', actual_delivery: '2026-03-09' });

    const order2 = await Order.create({ customer_id: customers[1].customer_id, order_date: new Date('2026-03-05'), status: 'shipped', items: [{ name: 'Round Plate 8"', quantity: 10000, unit_price: 5, total: 50000 }], total_amount: 50000, discount: 6000, gst: 7920, final_amount: 51920, payment_status: 'completed', payment_method: 'bank_transfer', shipping_address: '45 Civil Lines, Jaipur', estimated_delivery: '2026-03-20' });

    // ============ Transactions ============
    await Transaction.bulkCreate([
      { transaction_type: 'customer_charge', user_id: customerUsers[0].user_id, order_id: order1.order_id, amount_rupees: 32598, payment_gateway: 'razorpay', transaction_status: 'completed' },
      { transaction_type: 'customer_charge', user_id: customerUsers[1].user_id, order_id: order2.order_id, amount_rupees: 51920, payment_gateway: 'bank_transfer', transaction_status: 'completed' },
      { transaction_type: 'farmer_payout', user_id: farmerUsers[0].user_id, amount_rupees: 23000, payment_gateway: 'bank_transfer', transaction_status: 'completed' },
      { transaction_type: 'farmer_payout', user_id: farmerUsers[1].user_id, amount_rupees: 38000, payment_gateway: 'bank_transfer', transaction_status: 'pending' },
    ]);

    // ============ Certificates ============
    await Certificate.create({ order_id: order1.order_id, customer_id: customers[0].customer_id, company_name: 'GreenPlate Foods Pvt Ltd', paddy_diverted_kg: 250, co2_saved_kg: 375, aqi_impact_reduction: 0.02, certificate_date: new Date('2026-03-11'), validity_end: new Date('2027-03-11'), verification_status: 'issued' });

    console.log('✅ Seed data inserted successfully!');
    console.log('\n📋 Login credentials (all passwords: password123):');
    console.log('   Admin:    admin@biopaddy.com');
    console.log('   Farmer:   +919876543210 (Rajesh Kumar)');
    console.log('   Customer: greenplate@corp.com (GreenPlate Foods)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
