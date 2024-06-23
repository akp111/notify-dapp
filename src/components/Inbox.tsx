// import React from "react";

import { useAccount } from "@starknet-react/core";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../contract/config";

export default function Inbox() {
  const { address } = useAccount();
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(address)
    axios.get(config.BACKEND_URL + "notify/inbox?address=" + address).then((res) => {
      setInbox(res.data);
      setLoading(false);
    }
    );
  },[address]);


  return (
    <div className="flex h-[40rem] max-h-[40rem] justify-start flex-col w-1/2 gap-6 mt-2 overflow-y-auto">
      <p className="text-2xl font-semibold">Inbox</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        inbox.map((notification, index) => (
          <div
            className="flex bg-white justify-between items-center gap-2 p-3 rounded-xl "
            key={index}
          >
            <p className="text-mg font-medium">{notification.payload.title}</p>
            <p className="text-mg font-medium">{notification.payload.body}</p>
          </div>
        ))
      )}
    </div>
  );
}
