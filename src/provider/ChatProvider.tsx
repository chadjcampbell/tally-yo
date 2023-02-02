import { onAuthStateChanged, User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { auth } from "../firebase";

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
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
    <ChatContext.Provider value={{ user, loading, setLoading }}>
      {children}
    </ChatContext.Provider>
  );
};
