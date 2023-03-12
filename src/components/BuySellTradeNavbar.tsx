import { Flex, Link } from "@chakra-ui/react";
import { NavLink as ReactRouterLink } from "react-router-dom";

const BuySellTradeNavbar = () => {
  return (
    <Flex>
      {" "}
      <Link
        p="2"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg="white"
        textColor="black"
        as={ReactRouterLink}
        to="/buySellTrade/buy"
        _focus={{ boxShadow: "none" }}
        _activeLink={{ bg: "teal.400", color: "white" }}
        _hover={{
          bg: "teal.400",
          color: "white",
        }}
      >
        Buy
      </Link>
      <Link
        p="2"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg="white"
        textColor="black"
        as={ReactRouterLink}
        to="/buySellTrade/sell"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
        _activeLink={{ bg: "teal.400", color: "white" }}
        _hover={{
          bg: "teal.400",
          color: "white",
        }}
      >
        Sell
      </Link>
    </Flex>
  );
};

export default BuySellTradeNavbar;
