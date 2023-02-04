import {
  CardFooter,
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { v4 as uuid } from "uuid";
import { db } from "../firebase";

const ChatInput = () => {
  const [text, setText] = useState("");

  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSubmit = async () => {
    await updateDoc(doc(db, "chats", data.chatID), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: user?.uid,
        date: Timestamp.now(),
      }),
    });
    data.user &&
      (await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatID + ".date"]: serverTimestamp(),
      }));
    user &&
      (await updateDoc(doc(db, "userChats", user.uid), {
        [data.chatID + ".date"]: serverTimestamp(),
      }));
    setText("");
    console.log("text sent");
  };

  return (
    <CardFooter width="full" borderRadius="0 0 1em 1em">
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <FormControl>
          <InputGroup>
            <Input
              autoComplete="off"
              id="userMessage"
              type="textarea"
              placeholder="Send message..."
              width="full"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm">
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
    </CardFooter>
  );
};

export default ChatInput;
