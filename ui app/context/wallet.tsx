import { createContext } from "react";
import React, { useState } from "react";

export const WalletContext = createContext("");

const Connector = ({ children }: any) => {
  let address: string;
  let setaddress: any;
  [address, setaddress] = useState("");
  return (
    <WalletContext.Provider value={{ address, setaddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export default Connector;
