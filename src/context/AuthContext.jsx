import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let storedUser = localStorage.getItem('clinic_user');
    if (storedUser) {
      if (storedUser.includes("William Silva")) {
        storedUser = storedUser.replace(/William Silva/g, "Gabriel Lucas");
        localStorage.setItem('clinic_user', storedUser);
      }
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Para um sistema acadêmico, simulamos a validação de credenciais
    if (email === 'admin@clinica.com' && password === '123456') {
      const userData = { email, name: 'Gabriel Lucas', role: 'Administrador' };
      localStorage.setItem('clinic_user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    }
    return { success: false, message: 'E-mail ou senha incorretos.' };
  };

  const logout = () => {
    localStorage.removeItem('clinic_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
