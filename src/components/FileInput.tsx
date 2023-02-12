import {
  Button,
  chakra,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa";

const CFaImage = chakra(FaImage);

export const FileInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [iconColor, setIconColor] = useState("gray.300");
  const fileStatus = "add an avatar";

  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          children={<CFaImage color={iconColor} />}
        />
        <input
          onInput={() => setIconColor("teal.400")}
          id="file"
          type="file"
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
        />
        <Input border="none" placeholder={fileStatus} readOnly type="text" />
        <InputRightElement width="8rem">
          <Button
            onClick={() => inputRef.current?.click()}
            id="avatar"
            border="md"
            borderColor={iconColor}
          >
            Upload Avatar
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};
