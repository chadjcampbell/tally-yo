import { createContext } from "react";
import { ChatAction, ChatState } from "../provider/ChatProvider";

type ChatContext = {
  data: ChatState;
  dispatch: React.Dispatch<ChatAction>;
};

export const ChatContext = createContext({} as ChatContext);
