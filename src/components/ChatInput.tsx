import {
  CardFooter,
  FormControl,
  InputGroup,
  InputRightElement,
  Button,
  HStack,
  Textarea,
} from "@chakra-ui/react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { FormEvent, KeyboardEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase";
import { ChatImgUpload } from "./ChatImgUpload";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const [iconColor, setIconColor] = useState("gray.300");

  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (text !== "" || img !== null) {
      if (img) {
        const storageRef = ref(storage, uuid());

        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatID), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: user?.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatID), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: user?.uid,
            date: Timestamp.now(),
          }),
        });
      }
      data.user &&
        (await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatID + ".date"]: serverTimestamp(),
          [data.chatID + ".mostRecentMessage"]: text,
        }));
      user &&
        (await updateDoc(doc(db, "userChats", user.uid), {
          [data.chatID + ".date"]: serverTimestamp(),
          [data.chatID + ".mostRecentMessage"]: text,
        }));
      setText("");
      setImg(null);
      setIconColor("gray.300");
    }
  };

  const enterPress = (e: FormEvent & KeyboardEvent) => {
    if (e.key == "Enter" && e.shiftKey == false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <CardFooter width="100%" borderRadius="0 0 1em 1em">
      <form onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>
        <FormControl>
          <InputGroup>
            <Textarea
              resize="none"
              autoComplete="off"
              id="userMessage"
              placeholder="Send message..."
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => enterPress(e)}
              value={text}
              pr="8rem"
            />
            <InputRightElement width="auto">
              <HStack align="center" justify="center" m="2" p="2">
                <ChatImgUpload
                  setImg={setImg}
                  iconColor={iconColor}
                  setIconColor={setIconColor}
                />
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
