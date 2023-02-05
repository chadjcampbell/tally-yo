import { Button, chakra } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useRef } from "react";
import { FaImage } from "react-icons/fa";

const CFaImage = chakra(FaImage);

type ChatImgUploadProps = {
  setImg: Dispatch<SetStateAction<File | null>>;
  iconColor: string;
  setIconColor: React.Dispatch<React.SetStateAction<string>>;
};

export const ChatImgUpload = ({
  setImg,
  iconColor,
  setIconColor,
}: ChatImgUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSetImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIconColor("green.300");
    e.target.files && setImg(e.target.files[0]);
  };

  return (
    <>
      <Button
        border="2px solid"
        borderColor={iconColor}
        h="1.75rem"
        size="sm"
        children={
          <CFaImage
            color={iconColor}
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
        onChange={(e) => handleSetImg(e)}
      />
    </>
  );
};
