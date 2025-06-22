import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export  function  AuthProvider({ children }) {
  const [user, setUser] = useState(null);

const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export  function  useAuth() {
  return useContext(AuthContext);
}