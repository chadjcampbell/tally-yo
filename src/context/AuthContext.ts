import { User } from "firebase/auth";
import { createContext } from "react";

export const AuthContext = createContext<User | null>(null);
