// import React from "react";
import axios from "axios";
import AddReceiver from "../contract/create-receiver";
import { useEffect, useState } from "react";
import config from "../contract/config";
import { useAccount } from "@starknet-react/core";
export default function RecieveNotif() {
//   curl --location --request GET 'http://localhost:3000/receiverEmitterList?address=12346' \
// --header 'Content-Type: application/json' \
// --data '{
//     "address":"12346"
// }'

  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [emitters, setEmitters] = useState([]);

  useEffect(() => {
    axios.get(config.BACKEND_URL + "receiverEmitterList?address=" + address).then((res) => {
      setEmitters(res.data);
      setLoading(false);
    });
  });


  return (
    <div className="flex h-[40rem] max-h-[40rem] justify-start flex-col w-1/2 gap-6 mt-2 overflow-y-auto">
      <p className="text-2xl font-semibold">Emitters List</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        emitters.map((emitter, index) => (
          <div
            className="flex bg-white justify-between items-center gap-2 p-3 rounded-xl "
            key={index}
          >
              <div className="flex gap-4">
            <img src={emitter.icon} width={48} height={48} />
            <div className="flex flex-col gap-0 justify-center ">
              <p className="text-lg font-semibold">{emitter.name}</p>
              <p className="text-mg font-medium">{emitter.description}</p>
            </div>
            </div>
            <AddReceiver emitter={emitter.address}/>
            </div>
        ))
      )}
    </div>
  );
}
