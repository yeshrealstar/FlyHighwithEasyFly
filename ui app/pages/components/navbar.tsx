import React, { useEffect, useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";
import { useContext } from "react";
import { WalletContext } from "@/context/wallet";

const Navbar = () => {
  const { address, setaddress } = useContext(WalletContext);

  const peraWallet = new PeraWalletConnect();

  // useEffect(() => {
  //   if (address) {
  //     console.log(address);
  //   }
  // });

  const handleConnectWalletClick = () => {
    peraWallet.connect().then((newaccounts: string[]) => {
      peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);
      setaddress(newaccounts[0]);
    });
  };
  const handleDisconnectWalletClick = () => {
    peraWallet.disconnect();
    setaddress("");
  };
  return (
    <div>
      <div className="flex max-w-[80%] mx-auto justify-between p-5">
        <h2 className="text-2xl font-semibold">EASYFLY</h2>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (!address) {
              handleConnectWalletClick();
            }
            handleDisconnectWalletClick();
          }}
          className="text-xl rounded-full bg-[#80d9ff] px-2 p-1 w-32 shadow-sm border"
        >
          {address ? "Disconnect" : "Connect"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
