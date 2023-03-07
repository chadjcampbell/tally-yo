import { HStack, Icon, Text } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { round } from "../utils/round";

type PercentBoxProps = {
  percent: number;
};

const PercentBox = ({ percent }: PercentBoxProps) => {
  const stockUp = percent > 0 ? true : false;

  return (
    <HStack borderRadius="lg" p="2" bgColor={stockUp ? "green.200" : "red.200"}>
      <Text>
        {stockUp ? <Icon as={FaArrowUp} /> : <Icon as={FaArrowDown} />}
      </Text>
      <Text>{round(percent)}%</Text>
    </HStack>
  );
};

export default PercentBox;
