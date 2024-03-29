import { onAuthStateChanged, User } from "firebase/auth";
import { query, collection, getDocs } from "firebase/firestore";
import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth, db } from "../firebase";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [yfKey, setYfKey] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getKey = async () => {
      const keyDoc = query(collection(db, "yfKey"));
      const querySnapshot = await getDocs(keyDoc);
      setYfKey(querySnapshot.docs[0].data().key);
      setLoading(false);
    };
    user && getKey();
    return () => {
      setYfKey(null);
      setLoading(false);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ yfKey, user, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
