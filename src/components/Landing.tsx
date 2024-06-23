// import React from "react";
// import { useBlock } from "@starknet-react/core";

function Landing() {
  return (

      <div className="flex  py-2 px-16 w-full h-[50%] items-start justify-between ">
        <div className="flex gap-8 flex-col mt-36 pl-16">
          <p className="text-5xl w-full whitespace-nowrap font-bold">Get Notified anywhere</p>
          <p className="text-2xl font-medium">World at your fingertips. A decentralised way to get notifications.</p>
        </div>

        <div className="h-[40rem]">
          <img src="/hero.png" className="h-full w-full" />
        </div>
      </div>
  );
}

export default Landing;
