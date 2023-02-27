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

  return <div>Sell: Nothing here yet...</div>;
};

export default Sell;
