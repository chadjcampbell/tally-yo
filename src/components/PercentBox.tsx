import { HStack, Icon, Text } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

type PercentBoxProps = {
  percent: number;
};

const PercentBox = ({ percent }: PercentBoxProps) => {
  const stockUp = percent > 0 ? true : false;
  return (
    <HStack bgColor={stockUp ? "green.300" : "red.300"}>
      <Text>
        {stockUp ? <Icon as={FaArrowUp} /> : <Icon as={FaArrowDown} />}
      </Text>
      <Text>{Math.round(percent * 100) / 100}%</Text>
    </HStack>
  );
};

export default PercentBox;
