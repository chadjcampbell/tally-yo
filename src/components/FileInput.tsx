import {
  Button,
  chakra,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaImage } from "react-icons/fa";

const CFaImage = chakra(FaImage);

export const FileInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileStatus = "choose file...";

  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          children={<CFaImage color="gray.300" />}
        />
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
        />
        <Input border="none" placeholder={fileStatus} readOnly type="text" />
        <InputRightElement width="8rem">
          <Button onClick={() => inputRef.current?.click()} id="avatar">
            Upload Avatar
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};
