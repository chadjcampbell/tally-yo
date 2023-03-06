import { HStack } from "@chakra-ui/react";

type PercentBoxProps = {
  percent: number;
};

const PercentBox = ({ percent }: PercentBoxProps) => {
  const stockUp = percent > 0 ? true : false;
  return <HStack></HStack>;
};

export default PercentBox;
