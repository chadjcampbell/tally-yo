import { HStack, Icon, Text } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

type ProfitBoxProps = {
  priceChange: number;
};

const ProfitBox = ({ priceChange }: ProfitBoxProps) => {
  const stockUp = priceChange > 0 ? true : false;

  return (
    <HStack borderRadius="lg" p="2" bgColor={stockUp ? "#e6f4ea" : "#fce8e6"}>
      <Text color={stockUp ? "#137333" : "#a50e0e"}>
        {stockUp ? (
          <Icon color="#137333" as={FaArrowUp} />
        ) : (
          <Icon color="#a50e0e" as={FaArrowDown} />
        )}
      </Text>
      <Text color={stockUp ? "#137333" : "#a50e0e"}>
        ${Math.abs(Number(priceChange.toFixed(2)))}
      </Text>
    </HStack>
  );
};

export default ProfitBox;
