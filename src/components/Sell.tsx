import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { DocumentData, onSnapshot, doc } from "firebase/firestore";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChartComponent } from "./ChartComponent";
import Loading from "./Loading";
import StockBuyerBtns from "./StockBuyerBtns";

type firebaseStockInfo = {
  stock: string;
  quantity: number;
  cost: number;
};

const Sell = () => {
  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);

  user &&
    useEffect(() => {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setUserInfo(doc.data()!);
      });
      return () => {
        unsub();
      };
    }, []);

  return (
    <>
      <TableContainer>
        <Table size="sm" variant="striped" colorScheme="teal">
          <TableCaption>Your stock holdings</TableCaption>
          <Thead>
            <Tr>
              <Th>Stock</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>Cost</Th>
              <Th> </Th>
            </Tr>
          </Thead>
          <Tbody>
            {userInfo?.stocks.map((stock: firebaseStockInfo) => (
              <Tr key={stock.stock}>
                <Td>{stock.stock}</Td>
                <Td isNumeric>{stock.quantity}</Td>
                <Td isNumeric>{stock.cost}</Td>
                <Td textAlign="right">
                  {" "}
                  <Button
                    onClick={onOpen}
                    alignSelf="bottom"
                    colorScheme="teal"
                  >
                    Info
                  </Button>{" "}
                  <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>{stock.stock}</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody></ModalBody>
                      <ModalFooter></ModalFooter>
                    </ModalContent>
                  </Modal>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>
                <Button>Previous</Button>
              </Th>
              <Th> </Th>
              <Th> </Th>
              <Th textAlign="right">
                <Button>Next</Button>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default Sell;
