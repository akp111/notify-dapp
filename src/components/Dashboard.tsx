// import React from "react";
// import { useBlock } from "@starknet-react/core";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-12  w-1/2 h-[100%] flex-wrap justify-center">
      <div
        className="flex items-center flex-col w-[300px] bg-blue-950 p-6 gap-3 rounded-xl"
        onClick={() => navigate("/emitter")}
      >
        <img
          src="/channel.png"
          className="object-contain w-24 h-24"
          alt="starknet-icon"
        />
        <p className="mb-2 text-lg text-white">
          Create Emitter
          <span className=" group-hover:font-bold transition-all ml-2 group-hover:ml-4">
            {">"}
          </span>
        </p>
      </div>

      <div
        className="flex flex-col items-center  w-[300px] bg-blue-950 p-6 gap-3 rounded-xl"
        onClick={() => navigate("/recieve")}
      >
        <img
          src="/recieve.png"
          className="object-contain w-24 h-24"
          alt="react-icon"
        />
        <p className="mb-2 text-lg text-white">
          Recieve Notifications
          <span className="group-hover:font-bold transition-all ml-2 group-hover:ml-4">
            {">"}
          </span>
        </p>
      </div>
      <div
        className="flex flex-col items-center  w-[300px] bg-blue-950 p-6 gap-3 rounded-xl"
        onClick={() => navigate("/send")}
      >
        <img
          src="/send.png"
          className="object-contain w-24 h-24"
          alt="react-icon"
        />
        <p className="mb-2 text-lg text-white">
          Send Notifications
          <span className="group-hover:font-bold transition-all ml-2 group-hover:ml-4">
            {">"}
          </span>
        </p>
      </div>
      <div
        className="flex flex-col items-center  w-[300px] bg-blue-950 p-6 gap-3 rounded-xl"
        onClick={() => navigate("/inbox")}
      >
        <img
          src="/inbox.png"
          className="object-contain w-24 h-24"
          alt="react-icon"
        />
        <p className="mb-2 text-lg text-white">
          Inbox
          <span className="group-hover:font-bold transition-all ml-2 group-hover:ml-4">
            {">"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
