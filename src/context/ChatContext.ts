import { User } from "firebase/auth";
import { createContext } from "react";

type ChatContext = {
  user: User | null | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ChatContext = createContext({} as ChatContext);
