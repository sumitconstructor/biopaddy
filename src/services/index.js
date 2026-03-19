import api from './api';

export const authService = {
  loginFarmer: (phone_number, password) => api.post('/auth/login', { phone_number, password }),
  loginCustomer: (email, password) => api.post('/auth/login', { email, password }),
  loginAdmin: (email, password) => api.post('/auth/login', { email, password }),

  registerFarmer: (data) => api.post('/auth/register/farmer', data),
  registerCustomer: (data) => api.post('/auth/register/customer', data),

  sendOtp: (phone_number) => api.post('/auth/send-otp', { phone_number }),
  verifyOtp: (phone_number, otp) => api.post('/auth/verify-otp', { phone_number, otp }),

  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
};

export const farmerService = {
  getProfile: () => api.get('/farmers/profile'),
  updateProfile: (data) => api.put('/farmers/profile', data),
  getDashboard: () => api.get('/farmers/dashboard'),
};

export const bookingService = {
  create: (data) => api.post('/bookings', data),
  list: (params) => api.get('/bookings', { params }),
  getById: (id) => api.get(`/bookings/${id}`),
  update: (id, data) => api.patch(`/bookings/${id}`, data),
  cancel: (id) => api.delete(`/bookings/${id}`),
};

export const productService = {
  list: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
};

export const orderService = {
  create: (data) => api.post('/orders', data),
  list: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, data) => api.patch(`/orders/${id}`, data),
};

export const certificateService = {
  list: () => api.get('/certificates'),
  create: (order_id) => api.post('/certificates', { order_id }),
  update: (id, data) => api.patch(`/certificates/${id}`, data),
};

export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
  getFarmers: (params) => api.get('/admin/farmers', { params }),
  verifyFarmer: (id) => api.patch(`/admin/farmers/${id}/verify`),
  rejectFarmer: (id) => api.patch(`/admin/farmers/${id}/reject`),
  getFinance: () => api.get('/admin/finance'),
  processPayout: (bookingId) => api.post(`/admin/payouts/${bookingId}`),
  getInventory: () => api.get('/admin/inventory'),
};
