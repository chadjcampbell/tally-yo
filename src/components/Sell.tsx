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
} from "@chakra-ui/react";
import { DocumentData, onSnapshot, doc } from "firebase/firestore";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

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
          {userInfo?.stocks.map((stock) => (
            <Tr>
              <Td>{stock.stock}</Td>
              <Td isNumeric>{stock.quantity}</Td>
              <Td isNumeric>{stock.cost}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Previous</Th>
            <Th>Next</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Sell;
