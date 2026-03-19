import { createContext, useContext, useState } from 'react';
import { mockFarmers, mockCustomers, mockAdmins } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userType, email) => {
    let found;
    if (userType === 'farmer') {
      found = mockFarmers.find(f => f.email === email) || { ...mockFarmers[0] };
    } else if (userType === 'customer') {
      found = mockCustomers.find(c => c.email === email) || { ...mockCustomers[0] };
    } else {
      found = mockAdmins.find(a => a.email === email) || { ...mockAdmins[0] };
    }
    setUser({ ...found, user_type: userType });
    setIsAuthenticated(true);
    return found;
  };

  const loginAs = (userType) => {
    if (userType === 'farmer') login('farmer', mockFarmers[0].email);
    else if (userType === 'customer') login('customer', mockCustomers[0].email);
    else login('admin', mockAdmins[0].email);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
