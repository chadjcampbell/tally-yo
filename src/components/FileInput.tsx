import {
  chakra,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";

const CFaImage = chakra(FaImage);

export const FileInput = (props: InputProps) => {
  const styles = useMultiStyleConfig("Button", { variant: "outline" });

  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          children={<CFaImage color="gray.300" />}
        />
        <Input
          id="avatar"
          variant="unstyled"
          type="file"
          accept="image/*"
          sx={{
            "::file-selector-button": {
              border: "none",
              outline: "none",
              mr: 2,
              ...styles,
            },
          }}
          {...props}
        />
      </InputGroup>
    </FormControl>
  );
};
