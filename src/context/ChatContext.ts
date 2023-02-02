import { createContext } from "react";

type ChatContext = {
  data: state;
  dispatch: dispatch;
};

export const ChatContext = createContext({} as ChatContext);
