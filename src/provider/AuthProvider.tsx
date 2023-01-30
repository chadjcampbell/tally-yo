import { onAuthStateChanged, User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
