import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. When the app loads, check if the user already has a "VIP wristband" (token) saved
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // 2. The REAL login function that talks to your Render backend
  const login = async (role, email, password) => {
    // This uses the VITE_API_URL we set up in Netlify!
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, email, password }),
    });

    const data = await response.json();

    // If the password is wrong or user doesn't exist, throw an error back to Login.jsx
    if (!response.ok) {
      throw new Error(data.message || 'Invalid credentials. Please try again.');
    }

    // If successful, save the token and user data to the browser
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  // 3. The logout function (rips off the VIP wristband)
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login'; // Send them back to the login page
  };

  // 4. A dummy function just so the "Quick Demo" buttons on your login screen don't crash the app
  const loginAs = (role) => {
    console.warn("Demo login used. Note: This does not verify with the database!");
    // You can remove this entirely once you delete the demo buttons from Login.jsx
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginAs, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
