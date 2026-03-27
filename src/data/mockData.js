// Mock data for BioPaddy platform

// ============== USERS ==============
export const mockFarmers = [
  { user_id: 'f1', email: 'rajesh@mail.com', phone_number: '+919876543210', user_type: 'farmer', profile_name: 'Rajesh Kumar', language_preference: 'hindi', is_verified: true, is_active: true, aadhaar_number: '****5678', land_area_acres: 12, farm_location_lat: 30.7333, farm_location_long: 76.7794, primary_crop: 'rice', total_earnings: 185000, rating: 4.5, verified_by_admin: true },
  { user_id: 'f2', email: 'sukhdev@mail.com', phone_number: '+919876543211', user_type: 'farmer', profile_name: 'Sukhdev Singh', language_preference: 'punjabi', is_verified: true, is_active: true, aadhaar_number: '****9012', land_area_acres: 18, farm_location_lat: 31.1048, farm_location_long: 77.1734, primary_crop: 'wheat', total_earnings: 243000, rating: 4.8, verified_by_admin: true },
  { user_id: 'f3', email: 'anita@mail.com', phone_number: '+919876543212', user_type: 'farmer', profile_name: 'Anita Devi', language_preference: 'hindi', is_verified: true, is_active: true, aadhaar_number: '****3456', land_area_acres: 8, farm_location_lat: 29.9457, farm_location_long: 78.1642, primary_crop: 'both', total_earnings: 92000, rating: 4.2, verified_by_admin: true },
  { user_id: 'f4', email: 'harpreet@mail.com', phone_number: '+919876543213', user_type: 'farmer', profile_name: 'Harpreet Kaur', language_preference: 'punjabi', is_verified: false, is_active: true, aadhaar_number: '****7890', land_area_acres: 25, farm_location_lat: 30.3398, farm_location_long: 76.3869, primary_crop: 'rice', total_earnings: 0, rating: 0, verified_by_admin: false },
  { user_id: 'f5', email: 'mohan@mail.com', phone_number: '+919876543214', user_type: 'farmer', profile_name: 'Mohan Lal', language_preference: 'hindi', is_verified: true, is_active: true, aadhaar_number: '****2345', land_area_acres: 15, farm_location_lat: 28.6139, farm_location_long: 77.2090, primary_crop: 'wheat', total_earnings: 167000, rating: 4.6, verified_by_admin: true },
  { user_id: 'f6', email: 'gurpreet@mail.com', phone_number: '+919876543215', user_type: 'farmer', profile_name: 'Gurpreet Singh', language_preference: 'punjabi', is_verified: true, is_active: true, aadhaar_number: '****6789', land_area_acres: 30, farm_location_lat: 31.3260, farm_location_long: 75.5762, primary_crop: 'rice', total_earnings: 312000, rating: 4.9, verified_by_admin: true },
  { user_id: 'f7', email: 'kamla@mail.com', phone_number: '+919876543216', user_type: 'farmer', profile_name: 'Kamla Sharma', language_preference: 'hindi', is_verified: true, is_active: false, aadhaar_number: '****0123', land_area_acres: 6, farm_location_lat: 30.9010, farm_location_long: 75.8573, primary_crop: 'wheat', total_earnings: 45000, rating: 3.8, verified_by_admin: true },
  { user_id: 'f8', email: 'balwinder@mail.com', phone_number: '+919876543217', user_type: 'farmer', profile_name: 'Balwinder Gill', language_preference: 'punjabi', is_verified: false, is_active: true, aadhaar_number: '****4567', land_area_acres: 20, farm_location_lat: 30.1575, farm_location_long: 75.8485, primary_crop: 'both', total_earnings: 0, rating: 0, verified_by_admin: false },
  { user_id: 'f9', email: 'devender@mail.com', phone_number: '+919876543218', user_type: 'farmer', profile_name: 'Devender Yadav', language_preference: 'hindi', is_verified: true, is_active: true, aadhaar_number: '****8901', land_area_acres: 10, farm_location_lat: 29.3803, farm_location_long: 79.4636, primary_crop: 'rice', total_earnings: 128000, rating: 4.3, verified_by_admin: true },
  { user_id: 'f10', email: 'paramjit@mail.com', phone_number: '+919876543219', user_type: 'farmer', profile_name: 'Paramjit Kaur', language_preference: 'punjabi', is_verified: true, is_active: true, aadhaar_number: '****2345', land_area_acres: 14, farm_location_lat: 30.5085, farm_location_long: 76.6612, primary_crop: 'both', total_earnings: 156000, rating: 4.4, verified_by_admin: true },
];

export const mockCustomers = [
  { user_id: 'c1', email: 'greenplate@corp.com', phone_number: '+919800000001', user_type: 'customer', profile_name: 'GreenPlate Foods', company_name: 'GreenPlate Foods Pvt Ltd', business_type: 'QSR', gst_number: '07AABCG1234L1ZG', contact_person: 'Vikram Mehta', total_orders: 24, total_spent: 485000, logo: '🍽️' },
  { user_id: 'c2', email: 'ecohotel@corp.com', phone_number: '+919800000002', user_type: 'customer', profile_name: 'EcoStay Hotels', company_name: 'EcoStay Hotels & Resorts', business_type: 'Hotel', gst_number: '09AABCE5678M2ZH', contact_person: 'Priya Sharma', total_orders: 15, total_spent: 890000, logo: '🏨' },
  { user_id: 'c3', email: 'cater@corp.com', phone_number: '+919800000003', user_type: 'customer', profile_name: 'Royal Caterers', company_name: 'Royal Caterers & Events', business_type: 'Caterer', gst_number: '06AABCR9012N3ZI', contact_person: 'Amit Gupta', total_orders: 32, total_spent: 1250000, logo: '🎉' },
  { user_id: 'c4', email: 'techcorp@corp.com', phone_number: '+919800000004', user_type: 'customer', profile_name: 'TechCorp India', company_name: 'TechCorp India Pvt Ltd', business_type: 'Corporate', gst_number: '27AABCT3456O4ZJ', contact_person: 'Neha Patel', total_orders: 8, total_spent: 320000, logo: '💼' },
  { user_id: 'c5', email: 'organic@corp.com', phone_number: '+919800000005', user_type: 'customer', profile_name: 'Organic Kitchen', company_name: 'Organic Kitchen Chain', business_type: 'QSR', gst_number: '29AABCO7890P5ZK', contact_person: 'Ravi Krishnan', total_orders: 18, total_spent: 670000, logo: '🥗' },
];

export const mockAdmins = [
  { user_id: 'a1', email: 'admin@biopaddy.com', user_type: 'admin', profile_name: 'Arun Kapoor', role: 'Super Admin' },
  { user_id: 'a2', email: 'ops@biopaddy.com', user_type: 'admin', profile_name: 'Meera Joshi', role: 'Operations Manager' },
  { user_id: 'a3', email: 'finance@biopaddy.com', user_type: 'admin', profile_name: 'Rahul Verma', role: 'Finance Manager' },
];

// ============== PRODUCTS ==============
export const mockProducts = [
  { product_id: 'p1', product_name: 'Eco Cup 200ml', category: 'cups', size_ml: 200, unit_price_rupees: 4.5, bulk_discount_percentage: 15, image_url: '/products/cup-200.jpg', quantity_in_stock: 15000, manufacturing_lead_time_days: 5, description: 'Biodegradable cup made from rice paddy straw. Perfect for hot and cold beverages.', is_available: true, rating: 4.7, reviews: 128, specs: { material: '100% Paddy Straw Fiber', weight: '12g', heatResistant: 'Up to 85°C', compostable: '90 days' } },
  { product_id: 'p2', product_name: 'Eco Cup 350ml', category: 'cups', size_ml: 350, unit_price_rupees: 6, bulk_discount_percentage: 15, image_url: '/products/cup-350.jpg', quantity_in_stock: 12000, manufacturing_lead_time_days: 5, description: 'Large biodegradable cup ideal for coffee, tea, and smoothies.', is_available: true, rating: 4.6, reviews: 95, specs: { material: '100% Paddy Straw Fiber', weight: '16g', heatResistant: 'Up to 85°C', compostable: '90 days' } },
  { product_id: 'p3', product_name: 'Round Plate 8"', category: 'plates', size_ml: null, unit_price_rupees: 5, bulk_discount_percentage: 12, image_url: '/products/plate-8.jpg', quantity_in_stock: 20000, manufacturing_lead_time_days: 4, description: '8-inch round plate from wheat straw. Sturdy enough for main courses.', is_available: true, rating: 4.8, reviews: 210, specs: { material: '100% Wheat Straw Fiber', weight: '25g', oilResistant: 'Yes', compostable: '60 days' } },
  { product_id: 'p4', product_name: 'Round Plate 10"', category: 'plates', size_ml: null, unit_price_rupees: 7, bulk_discount_percentage: 12, image_url: '/products/plate-10.jpg', quantity_in_stock: 18000, manufacturing_lead_time_days: 4, description: '10-inch dinner plate. Premium quality for any occasion.', is_available: true, rating: 4.9, reviews: 175, specs: { material: '100% Wheat Straw Fiber', weight: '35g', oilResistant: 'Yes', compostable: '60 days' } },
  { product_id: 'p5', product_name: 'Eco Spoon', category: 'spoons', size_ml: null, unit_price_rupees: 2, bulk_discount_percentage: 20, image_url: '/products/spoon.jpg', quantity_in_stock: 50000, manufacturing_lead_time_days: 3, description: 'Sturdy biodegradable spoon. Great for soups, desserts, and more.', is_available: true, rating: 4.5, reviews: 320, specs: { material: 'Paddy + Wheat Fiber Blend', weight: '6g', heatResistant: 'Up to 80°C', compostable: '45 days' } },
  { product_id: 'p6', product_name: 'Deep Bowl 500ml', category: 'bowls', size_ml: 500, unit_price_rupees: 8, bulk_discount_percentage: 10, image_url: '/products/bowl-500.jpg', quantity_in_stock: 10000, manufacturing_lead_time_days: 6, description: 'Deep bowl perfect for soups, salads, and noodle dishes.', is_available: true, rating: 4.7, reviews: 88, specs: { material: '100% Paddy Straw Fiber', weight: '30g', liquidProof: '4 hours', compostable: '90 days' } },
  { product_id: 'p7', product_name: 'Square Plate 9"', category: 'plates', size_ml: null, unit_price_rupees: 6.5, bulk_discount_percentage: 12, image_url: '/products/plate-sq-9.jpg', quantity_in_stock: 8000, manufacturing_lead_time_days: 5, description: 'Modern square plate design for premium dining experiences.', is_available: true, rating: 4.6, reviews: 62, specs: { material: 'Wheat Straw Fiber', weight: '28g', oilResistant: 'Yes', compostable: '60 days' } },
  { product_id: 'p8', product_name: 'Food Container 750ml', category: 'containers', size_ml: 750, unit_price_rupees: 12, bulk_discount_percentage: 10, image_url: '/products/container-750.jpg', quantity_in_stock: 5000, manufacturing_lead_time_days: 7, description: 'Sealable food container with lid. Perfect for takeaway meals.', is_available: true, rating: 4.8, reviews: 45, specs: { material: 'Paddy + Wheat Fiber', weight: '45g', liquidProof: '8 hours', compostable: '120 days' } },
];

// ============== SLOT BOOKINGS ==============
export const mockBookings = [
  { booking_id: 'b1', farmer_id: 'f1', farmer_name: 'Rajesh Kumar', booking_date: '2026-03-10', collection_date: '2026-03-15', collection_time_slot: 'morning', estimated_quantity_quintals: 12, current_quantity_quintals: 11.5, quality_grade: 'A', status: 'paid', pickup_location: 'Village Kheri, Punjab', payment_status: 'completed', payment_amount: 23000, payment_date: '2026-03-16' },
  { booking_id: 'b2', farmer_id: 'f2', farmer_name: 'Sukhdev Singh', booking_date: '2026-03-12', collection_date: '2026-03-18', collection_time_slot: 'afternoon', estimated_quantity_quintals: 20, current_quantity_quintals: 19, quality_grade: 'A', status: 'collected', pickup_location: 'Shimla Road, HP', payment_status: 'pending', payment_amount: 38000 },
  { booking_id: 'b3', farmer_id: 'f3', farmer_name: 'Anita Devi', booking_date: '2026-03-14', collection_date: '2026-03-20', collection_time_slot: 'morning', estimated_quantity_quintals: 8, current_quantity_quintals: null, quality_grade: 'B', status: 'confirmed', pickup_location: 'Dehradun, Uttarakhand', payment_status: 'pending', payment_amount: 12800 },
  { booking_id: 'b4', farmer_id: 'f5', farmer_name: 'Mohan Lal', booking_date: '2026-03-15', collection_date: '2026-03-22', collection_time_slot: 'evening', estimated_quantity_quintals: 15, current_quantity_quintals: null, quality_grade: 'A', status: 'pending', pickup_location: 'Ghaziabad, UP', payment_status: 'pending', payment_amount: 30000 },
  { booking_id: 'b5', farmer_id: 'f6', farmer_name: 'Gurpreet Singh', booking_date: '2026-03-16', collection_date: '2026-03-23', collection_time_slot: 'morning', estimated_quantity_quintals: 30, current_quantity_quintals: 28.5, quality_grade: 'A', status: 'paid', pickup_location: 'Jalandhar, Punjab', payment_status: 'completed', payment_amount: 57000, payment_date: '2026-03-24' },
  { booking_id: 'b6', farmer_id: 'f9', farmer_name: 'Devender Yadav', booking_date: '2026-03-17', collection_date: '2026-03-25', collection_time_slot: 'afternoon', estimated_quantity_quintals: 10, current_quantity_quintals: null, quality_grade: 'B', status: 'confirmed', pickup_location: 'Nainital, Uttarakhand', payment_status: 'pending', payment_amount: 16000 },
  { booking_id: 'b7', farmer_id: 'f10', farmer_name: 'Paramjit Kaur', booking_date: '2026-03-18', collection_date: '2026-03-26', collection_time_slot: 'morning', estimated_quantity_quintals: 14, current_quantity_quintals: null, quality_grade: 'A', status: 'pending', pickup_location: 'Patiala, Punjab', payment_status: 'pending', payment_amount: 28000 },
  { booking_id: 'b8', farmer_id: 'f1', farmer_name: 'Rajesh Kumar', booking_date: '2026-03-19', collection_date: '2026-03-28', collection_time_slot: 'afternoon', estimated_quantity_quintals: 10, current_quantity_quintals: null, quality_grade: 'B', status: 'pending', pickup_location: 'Village Kheri, Punjab', payment_status: 'pending', payment_amount: 16000 },
];

// ============== ORDERS ==============
export const mockOrders = [
  { order_id: 'ord1', customer_id: 'c1', customer_name: 'GreenPlate Foods', order_date: '2026-03-01', status: 'delivered', items: [{ product_id: 'p1', name: 'Eco Cup 200ml', quantity: 5000, unit_price: 4.5, total: 22500 }, { product_id: 'p5', name: 'Eco Spoon', quantity: 5000, unit_price: 2, total: 10000 }], total_amount: 32500, discount: 4875, gst: 4973, final_amount: 32598, payment_status: 'completed', payment_method: 'razorpay', shipping_address: '12 MG Road, Gurugram, Haryana 122001', estimated_delivery: '2026-03-10', actual_delivery: '2026-03-09' },
  { order_id: 'ord2', customer_id: 'c2', customer_name: 'EcoStay Hotels', order_date: '2026-03-05', status: 'shipped', items: [{ product_id: 'p3', name: 'Round Plate 8"', quantity: 10000, unit_price: 5, total: 50000 }, { product_id: 'p4', name: 'Round Plate 10"', quantity: 5000, unit_price: 7, total: 35000 }, { product_id: 'p6', name: 'Deep Bowl 500ml', quantity: 3000, unit_price: 8, total: 24000 }], total_amount: 109000, discount: 13080, gst: 17266, final_amount: 113186, payment_status: 'completed', payment_method: 'bank_transfer', shipping_address: '45 Civil Lines, Jaipur, Rajasthan 302001', estimated_delivery: '2026-03-20', actual_delivery: null },
  { order_id: 'ord3', customer_id: 'c3', customer_name: 'Royal Caterers', order_date: '2026-03-10', status: 'manufacturing', items: [{ product_id: 'p3', name: 'Round Plate 8"', quantity: 20000, unit_price: 5, total: 100000 }, { product_id: 'p5', name: 'Eco Spoon', quantity: 20000, unit_price: 2, total: 40000 }, { product_id: 'p1', name: 'Eco Cup 200ml', quantity: 10000, unit_price: 4.5, total: 45000 }], total_amount: 185000, discount: 27750, gst: 28305, final_amount: 185555, payment_status: 'completed', payment_method: 'razorpay', shipping_address: '78 Sector 17, Chandigarh 160017', estimated_delivery: '2026-03-28', actual_delivery: null },
  { order_id: 'ord4', customer_id: 'c4', customer_name: 'TechCorp India', order_date: '2026-03-14', status: 'confirmed', items: [{ product_id: 'p2', name: 'Eco Cup 350ml', quantity: 2000, unit_price: 6, total: 12000 }, { product_id: 'p8', name: 'Food Container 750ml', quantity: 1000, unit_price: 12, total: 12000 }], total_amount: 24000, discount: 2400, gst: 3888, final_amount: 25488, payment_status: 'pending', payment_method: 'razorpay', shipping_address: '22 Whitefield, Bangalore 560066', estimated_delivery: '2026-03-30', actual_delivery: null },
  { order_id: 'ord5', customer_id: 'c5', customer_name: 'Organic Kitchen', order_date: '2026-03-16', status: 'pending', items: [{ product_id: 'p7', name: 'Square Plate 9"', quantity: 8000, unit_price: 6.5, total: 52000 }, { product_id: 'p6', name: 'Deep Bowl 500ml', quantity: 5000, unit_price: 8, total: 40000 }], total_amount: 92000, discount: 9200, gst: 14904, final_amount: 97704, payment_status: 'pending', payment_method: 'bank_transfer', shipping_address: '33 Koramangala, Bangalore 560034', estimated_delivery: '2026-04-05', actual_delivery: null },
];

// ============== CERTIFICATES ==============
export const mockCertificates = [
  { certificate_id: 'cert1', order_id: 'ord1', company_name: 'GreenPlate Foods', paddy_diverted_kg: 250, co2_saved_kg: 375, aqi_impact_reduction: 0.02, certificate_date: '2026-03-11', validity_end: '2027-03-11', verification_status: 'issued', certificate_file_url: '/certs/cert1.pdf' },
  { certificate_id: 'cert2', order_id: 'ord2', company_name: 'EcoStay Hotels', paddy_diverted_kg: 680, co2_saved_kg: 1020, aqi_impact_reduction: 0.05, certificate_date: '2026-03-12', validity_end: '2027-03-12', verification_status: 'pending', certificate_file_url: null },
  { certificate_id: 'cert3', order_id: 'ord3', company_name: 'Royal Caterers', paddy_diverted_kg: 1500, co2_saved_kg: 2250, aqi_impact_reduction: 0.12, certificate_date: null, validity_end: null, verification_status: 'pending', certificate_file_url: null },
];

// ============== TRANSACTIONS ==============
export const mockTransactions = [
  { transaction_id: 't1', transaction_type: 'farmer_payout', user_id: 'f1', booking_id: 'b1', amount_rupees: 23000, payment_gateway: 'bank_transfer', transaction_status: 'completed', transaction_date: '2026-03-16' },
  { transaction_id: 't2', transaction_type: 'customer_charge', user_id: 'c1', order_id: 'ord1', amount_rupees: 32598, payment_gateway: 'razorpay', transaction_status: 'completed', transaction_date: '2026-03-01' },
  { transaction_id: 't3', transaction_type: 'farmer_payout', user_id: 'f6', booking_id: 'b5', amount_rupees: 57000, payment_gateway: 'bank_transfer', transaction_status: 'completed', transaction_date: '2026-03-24' },
  { transaction_id: 't4', transaction_type: 'customer_charge', user_id: 'c2', order_id: 'ord2', amount_rupees: 113186, payment_gateway: 'bank_transfer', transaction_status: 'completed', transaction_date: '2026-03-05' },
  { transaction_id: 't5', transaction_type: 'customer_charge', user_id: 'c3', order_id: 'ord3', amount_rupees: 185555, payment_gateway: 'razorpay', transaction_status: 'completed', transaction_date: '2026-03-10' },
  { transaction_id: 't6', transaction_type: 'farmer_payout', user_id: 'f2', booking_id: 'b2', amount_rupees: 38000, payment_gateway: 'bank_transfer', transaction_status: 'pending', transaction_date: '2026-03-19' },
];

// ============== VEHICLES ==============
export const mockVehicles = [
  { vehicle_id: 'v1', vehicle_number_plate: 'PB-10-AB-1234', driver_name: 'Ramesh Kumar', driver_phone: '+919900000001', status: 'on_route', current_capacity_quintals: 50, assigned_bookings: ['b3', 'b6'] },
  { vehicle_id: 'v2', vehicle_number_plate: 'HR-26-CD-5678', driver_name: 'Sanjay Verma', driver_phone: '+919900000002', status: 'available', current_capacity_quintals: 40, assigned_bookings: [] },
  { vehicle_id: 'v3', vehicle_number_plate: 'UP-14-EF-9012', driver_name: 'Anil Sharma', driver_phone: '+919900000003', status: 'loading', current_capacity_quintals: 60, assigned_bookings: ['b4'] },
];

// ============== INVENTORY ==============
export const mockInventory = {
  raw_materials: [
    { item_type: 'raw_material', name: 'Rice Paddy Straw (Grade A)', quantity_available: 450, unit: 'quintals', quality_grade: 'A', warehouse: 'Warehouse A - Ludhiana', reorder_level: 100 },
    { item_type: 'raw_material', name: 'Rice Paddy Straw (Grade B)', quantity_available: 280, unit: 'quintals', quality_grade: 'B', warehouse: 'Warehouse A - Ludhiana', reorder_level: 80 },
    { item_type: 'raw_material', name: 'Wheat Straw (Grade A)', quantity_available: 320, unit: 'quintals', quality_grade: 'A', warehouse: 'Warehouse B - Karnal', reorder_level: 100 },
    { item_type: 'raw_material', name: 'Wheat Straw (Grade C)', quantity_available: 150, unit: 'quintals', quality_grade: 'C', warehouse: 'Warehouse B - Karnal', reorder_level: 50 },
  ],
  finished_products: mockProducts.map(p => ({
    product_id: p.product_id,
    product_name: p.product_name,
    quantity_available: p.quantity_in_stock,
    warehouse: 'Main Warehouse - Chandigarh',
    reorder_level: 2000,
    reserved: Math.floor(p.quantity_in_stock * 0.15),
  })),
};

// ============== ANALYTICS DATA ==============
export const monthlyData = [
  { month: 'Apr', collection: 120, revenue: 180000, orders: 8, co2Saved: 180 },
  { month: 'May', collection: 145, revenue: 210000, orders: 12, co2Saved: 217 },
  { month: 'Jun', collection: 95, revenue: 150000, orders: 7, co2Saved: 142 },
  { month: 'Jul', collection: 80, revenue: 120000, orders: 5, co2Saved: 120 },
  { month: 'Aug', collection: 60, revenue: 90000, orders: 4, co2Saved: 90 },
  { month: 'Sep', collection: 110, revenue: 165000, orders: 9, co2Saved: 165 },
  { month: 'Oct', collection: 200, revenue: 320000, orders: 18, co2Saved: 300 },
  { month: 'Nov', collection: 280, revenue: 450000, orders: 25, co2Saved: 420 },
  { month: 'Dec', collection: 250, revenue: 390000, orders: 22, co2Saved: 375 },
  { month: 'Jan', collection: 180, revenue: 280000, orders: 15, co2Saved: 270 },
  { month: 'Feb', collection: 160, revenue: 240000, orders: 13, co2Saved: 240 },
  { month: 'Mar', collection: 190, revenue: 310000, orders: 16, co2Saved: 285 },
];

export const farmerEarningsData = [
  { month: 'Apr', earnings: 15000 },
  { month: 'May', earnings: 18500 },
  { month: 'Jun', earnings: 12000 },
  { month: 'Jul', earnings: 8000 },
  { month: 'Aug', earnings: 5000 },
  { month: 'Sep', earnings: 14000 },
  { month: 'Oct', earnings: 28000 },
  { month: 'Nov', earnings: 35000 },
  { month: 'Dec', earnings: 30000 },
  { month: 'Jan', earnings: 22000 },
  { month: 'Feb', earnings: 19000 },
  { month: 'Mar', earnings: 23000 },
];

// ============== SUPPORT TICKETS ==============
export const mockTickets = [
  { ticket_id: 'tk1', user_id: 'f1', user_name: 'Rajesh Kumar', user_type: 'farmer', subject: 'Payment delayed for booking b1', priority: 'high', status: 'open', created_at: '2026-03-17', messages: 2 },
  { ticket_id: 'tk2', user_id: 'c2', user_name: 'EcoStay Hotels', user_type: 'customer', subject: 'Order tracking not updating', priority: 'medium', status: 'in_progress', created_at: '2026-03-18', messages: 4 },
  { ticket_id: 'tk3', user_id: 'f3', user_name: 'Anita Devi', user_type: 'farmer', subject: 'Cannot book slot for next week', priority: 'low', status: 'resolved', created_at: '2026-03-15', messages: 3 },
  { ticket_id: 'tk4', user_id: 'c5', user_name: 'Organic Kitchen', user_type: 'customer', subject: 'Bulk pricing not applied correctly', priority: 'high', status: 'open', created_at: '2026-03-19', messages: 1 },
];
