import React, { useState, useEffect } from "react";
import Image from "next/image";
import Interface from "./interface";
import { WalletContext } from "@/context/wallet";
import { useContext } from "react";
import Data from "./data";

const Body = () => {
  const { address } = useContext(WalletContext);
  const [login, setlogin] = useState(false);
  useEffect(() => {
    if (address) {
      setlogin(true);
      console.log(address);
    } else {
      setlogin(false);
    }
  });

  return (
    <div>
      {login ? (
        <Interface />
      ) : (
        <div className="flex flex-col xl:flex-row justify-evenly space-y-5 xl:space-y-0">
          <div className="flex flex-col h-fit justify-center mt-28 xl:mt-48 space-y-5 items-end ">
            <div className="w-4/5 space-y-8">
              <h1
                style={{ lineHeight: "3rem" }}
                className=" text-2xl xl:text-4xl w-4/5 xl:w-5/6 leading-10"
              >
                Book your flights with ease and less fees
              </h1>
              <button className="w-fit md:w-1/4 text-blue-400 xl:shadow-xl xl:border xl:hover:bg-white xl:hover:text-black md:bg-blue-400 md:text-gray-800 md:p-1 md:rounded-full md:decoration-transparent underline underline-offset-4">
                Get Started
              </button>
            </div>
          </div>
          <Image
            className="xl:w-[50rem] xl:h-[50rem] w-96 h-auto mx-auto xl:mx-0"
            src="/flightgrp.png"
            height={1000}
            width={1000}
            alt="image"
          />
        </div>
      )}
    </div>
  );
};

export default Body;
