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
} from "@chakra-ui/react";
import { DocumentData, onSnapshot, doc } from "firebase/firestore";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

type firebaseStockInfo = {
  stock: string;
  quantity: number;
  cost: number;
};

const Sell = () => {
  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);
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
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Your stock holdings</TableCaption>
        <Thead>
          <Tr>
            <Th>Stock</Th>
            <Th isNumeric>Quantity</Th>
            <Th isNumeric>Cost</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userInfo?.stocks.map((stock: firebaseStockInfo) => (
            <Tr key={stock.stock}>
              <Td>{stock.stock}</Td>
              <Td isNumeric>{stock.quantity}</Td>
              <Td isNumeric>{stock.cost}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>
              <Button>Previous</Button>
            </Th>
            <Th> </Th>
            <Th textAlign="right">
              <Button>Next</Button>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Sell;
