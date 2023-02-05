import { Button, chakra } from "@chakra-ui/react";
import { useRef } from "react";
import { FaImage } from "react-icons/fa";

const CFaImage = chakra(FaImage);

export const ChatImgUpload = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Button
        h="1.75rem"
        size="sm"
        children={
          <CFaImage
            color="gray.300"
            onClick={() => inputRef.current?.click()}
          />
        }
      />
      <input
        id="file"
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
      />
    </>
  );
};
