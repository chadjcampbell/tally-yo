import { User } from "firebase/auth";
import { createContext } from "react";

type AuthContext = {
  user: User | null | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext({} as AuthContext);
