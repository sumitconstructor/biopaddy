import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/index';
import { mockFarmers, mockCustomers, mockAdmins } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const saved = localStorage.getItem('bp_user');
    const token = localStorage.getItem('bp_token');
    if (saved && token) {
      setUser(JSON.parse(saved));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Real API login
  const login = async (userType, identifier, password) => {
    try {
      let res;
      if (userType === 'farmer') {
        res = await authService.loginFarmer(identifier, password);
      } else {
        res = await authService.loginCustomer(identifier, password);
      }
      const { user: userData, profile, token, refreshToken } = res.data.data;
      const fullUser = { ...userData, ...profile };
      localStorage.setItem('bp_token', token);
      localStorage.setItem('bp_refresh_token', refreshToken);
      localStorage.setItem('bp_user', JSON.stringify(fullUser));
      setUser(fullUser);
      setIsAuthenticated(true);
      return fullUser;
    } catch (err) {
      console.warn('API login failed, using mock:', err.message);
      return loginMock(userType, identifier);
    }
  };

  // Mock login fallback (for demo without backend)
  const loginMock = (userType, email) => {
    let found;
    if (userType === 'farmer') found = mockFarmers.find(f => f.email === email) || { ...mockFarmers[0] };
    else if (userType === 'customer') found = mockCustomers.find(c => c.email === email) || { ...mockCustomers[0] };
    else found = mockAdmins.find(a => a.email === email) || { ...mockAdmins[0] };
    const fullUser = { ...found, user_type: userType };
    localStorage.setItem('bp_user', JSON.stringify(fullUser));
    localStorage.setItem('bp_token', 'mock_token');
    setUser(fullUser);
    setIsAuthenticated(true);
    return fullUser;
  };

  // Quick demo login
  const loginAs = (userType) => {
    if (userType === 'farmer') return loginMock('farmer', mockFarmers[0].email);
    if (userType === 'customer') return loginMock('customer', mockCustomers[0].email);
    return loginMock('admin', mockAdmins[0].email);
  };

  // Register
  const registerFarmer = async (data) => {
    try {
      const res = await authService.registerFarmer(data);
      const { user: u, token, refreshToken } = res.data.data;
      localStorage.setItem('bp_token', token);
      localStorage.setItem('bp_refresh_token', refreshToken);
      localStorage.setItem('bp_user', JSON.stringify(u));
      setUser(u);
      setIsAuthenticated(true);
      return u;
    } catch (err) {
      console.warn('API register failed:', err.message);
      return loginMock('farmer');
    }
  };

  const registerCustomer = async (data) => {
    try {
      const res = await authService.registerCustomer(data);
      const { user: u, token, refreshToken } = res.data.data;
      localStorage.setItem('bp_token', token);
      localStorage.setItem('bp_refresh_token', refreshToken);
      localStorage.setItem('bp_user', JSON.stringify(u));
      setUser(u);
      setIsAuthenticated(true);
      return u;
    } catch (err) {
      console.warn('API register failed:', err.message);
      return loginMock('customer');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('bp_token');
    localStorage.removeItem('bp_refresh_token');
    localStorage.removeItem('bp_user');
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, loginAs, loginMock, logout, registerFarmer, registerCustomer }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
