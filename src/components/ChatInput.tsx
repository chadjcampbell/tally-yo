import {
  CardFooter,
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  HStack,
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
import { ChatImgUpload } from "./ChatImgUpload";

const ChatInput = () => {
  const [text, setText] = useState("");

  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };

  return (
    <CardFooter width="100%" borderRadius="0 0 1em 1em">
      <form onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>
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
            <InputRightElement right="25px" width="4.5rem">
              <HStack align="center" justify="center" m="2" p="2">
                <ChatImgUpload />
                <Button h="1.75rem" size="sm" type="submit">
                  Send
                </Button>
              </HStack>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
    </CardFooter>
  );
};

export default ChatInput;
