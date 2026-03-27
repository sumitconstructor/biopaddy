import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Landing & Auth
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import FarmerRegister from './pages/auth/FarmerRegister';
import CustomerRegister from './pages/auth/CustomerRegister';

// Farmer Portal
import FarmerLayout from './layouts/FarmerLayout';
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import SlotBooking from './pages/farmer/SlotBooking';
import MyBookings from './pages/farmer/MyBookings';
import PaymentsEarnings from './pages/farmer/PaymentsEarnings';
import FarmerProfile from './pages/farmer/FarmerProfile';
import Resources from './pages/farmer/Resources';
import FarmerSupport from './pages/farmer/FarmerSupport';

// Customer Portal
import CustomerLayout from './layouts/CustomerLayout';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import ProductCatalog from './pages/customer/ProductCatalog';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrdersManagement from './pages/customer/OrdersManagement';
import Certificates from './pages/customer/Certificates';
import Subscriptions from './pages/customer/Subscriptions';
import CustomerProfile from './pages/customer/CustomerProfile';

// Admin Portal
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import FarmerManagement from './pages/admin/FarmerManagement';
import CollectionManagement from './pages/admin/CollectionManagement';
import InventoryManagement from './pages/admin/InventoryManagement';
import OrderManagement from './pages/admin/OrderManagement';
import CertificateManagement from './pages/admin/CertificateManagement';
import FinancialManagement from './pages/admin/FinancialManagement';
import ReportsAnalytics from './pages/admin/ReportsAnalytics';
import UserManagement from './pages/admin/UserManagement';
import SupportTickets from './pages/admin/SupportTickets';
import AdminSettings from './pages/admin/AdminSettings';

function ProtectedRoute({ children, allowedType }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedType && user?.user_type !== allowedType) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register/farmer" element={<FarmerRegister />} />
      <Route path="/register/customer" element={<CustomerRegister />} />

      {/* Farmer Portal */}
      <Route path="/farmer" element={
        <ProtectedRoute allowedType="farmer"><FarmerLayout /></ProtectedRoute>
      }>
        <Route index element={<FarmerDashboard />} />
        <Route path="book-slot" element={<SlotBooking />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="payments" element={<PaymentsEarnings />} />
        <Route path="profile" element={<FarmerProfile />} />
        <Route path="resources" element={<Resources />} />
        <Route path="support" element={<FarmerSupport />} />
      </Route>

      {/* Customer Portal */}
      <Route path="/customer" element={
        <ProtectedRoute allowedType="customer"><CustomerLayout /></ProtectedRoute>
      }>
        <Route index element={<CustomerDashboard />} />
        <Route path="products" element={<ProductCatalog />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders" element={<OrdersManagement />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Route>

      {/* Admin Portal */}
      <Route path="/admin" element={
        <ProtectedRoute allowedType="admin"><AdminLayout /></ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="farmers" element={<FarmerManagement />} />
        <Route path="collections" element={<CollectionManagement />} />
        <Route path="inventory" element={<InventoryManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="certificates" element={<CertificateManagement />} />
        <Route path="finance" element={<FinancialManagement />} />
        <Route path="reports" element={<ReportsAnalytics />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="support" element={<SupportTickets />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
