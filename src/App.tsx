// import React from "react";
// import { useBlock } from "@starknet-react/core";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Emitter from "./components/Emitter";
import Dashboard from "./components/Dashboard";
import RecieveNotif from "./components/RecieveNotif";
import SendNotif from "./components/SendNotif";
import Inbox from "./components/Inbox";
import Landing from "./components/Landing";

function App() {
  return (
    <>
      <main className=" flex flex-col items-center bg-red-100/50  min-h-screen gap-12">
        <Header />

        <Routes>
          <Route>
            <Route path="/" element={<Landing />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/emitter" element={<Emitter />} />
            <Route path="/recieve" element={<RecieveNotif />} />
            <Route path="/send" element={<SendNotif />} />
            <Route path="/inbox" element={<Inbox />} />
          </Route>
        </Routes>
      </main>
      <div className=" bg-rose-400 w-full justify-center flex p-2 text-md">
        Powered By Starknet
      </div>
    </>
  );
}

export default App;
