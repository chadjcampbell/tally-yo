import { User } from "firebase/auth";
import { ReactNode, useContext, useReducer } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

interface ChatProviderProps {
  children: ReactNode;
}

export interface ChatState {
  chatID: null | string;
  user: User | null;
}

export enum ActionType {
  CHANGE_USER = "CHANGE_USER",
}

export type ChatAction = {
  type: ActionType;
  payload: User;
};

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const { user } = useContext(AuthContext);

  const INITIAL_STATE: ChatState = {
    chatID: null,
    user: null,
  };

  const chatReducer = (state: ChatState, action: ChatAction) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          chatID:
            user && user?.uid > action.payload.uid
              ? user?.uid + action.payload.uid
              : action.payload.uid + user?.uid,
          user: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
