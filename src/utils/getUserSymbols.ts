import { DocumentData } from "firebase/firestore";
import { firebaseStockInfo } from "../components/Sell";

export const getUserSymbols = (userInfo: DocumentData) =>
  userInfo.stocks.map((stock: firebaseStockInfo) => stock.stock);
