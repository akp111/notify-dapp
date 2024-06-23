import { useMemo, useState } from "react";
import { useAccount, useContract, useContractWrite, useWaitForTransaction } from "@starknet-react/core";
import * as starknet from "starknet";
import config from "../contract/config";
import axios from "axios";

export default function Emitter() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [desc, setDesc] = useState("");

  const { address } = useAccount();
  const { contract } = useContract({
    abi: config.CONTRACT_ABI,
    address: config.CONTRACT_ADDRESS,
  });

  const calls = useMemo(() => {
    if (!contract || !address) return [];

    return contract.populateTransaction["addEmitter"]!(
      starknet.typedData.byteArrayFromString(name),
      starknet.typedData.byteArrayFromString(desc),
      starknet.typedData.byteArrayFromString(`${address}`),
      starknet.typedData.byteArrayFromString(icon)
    );

  }, [contract, address, name, desc, icon]);

  const {
    write,
    reset,
    data: tx,
    isPending: isSubmitting,
    isError: isSubmitError,
    error: submitError,
  } = useContractWrite({
    calls,
  });

  const {
    data: receipt,
    isLoading,
    isError,
    error,
  } = useWaitForTransaction({
    hash: tx?.transaction_hash,
    watch: true,
    retry: true,
    refetchInterval: 2000,
  });

  console.log(tx, "trasanction refetched")


  const action = () => {
    if (receipt) {
      reset()
    } else {
      axios.post(config.BACKEND_URL + "addEmitter", {
        emitterAddress: address,
        name: name,
        desc: desc,
        icon: icon
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
      write();
    }
  };

  return (
    <div className="flex h-full w-full justify-center mt-20">
      <div className="flex rounded-xl bg-slate-50 flex-col items-center p-6 px-8 w-1/3 gap-6">
        <p className="text-2xl font-semibold"> Create Emitter</p>

        <div className="flex flex-col gap-2 w-full ">
          <label>Name</label>
          <input
            className="h-[40px] rounded-md border-2 p-2"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Description </label>
          <input
            className="h-[40px] rounded-md border-2 p-2"
            type="text"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Icon url</label>
          <input
            className="h-[40px] rounded-md border-2 p-2"
            type="text"
            name="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </div>
        <button 
          className="py-2 px-6 bg-blue-950 text-white rounded-lg"
          onClick={action}
          disabled={!address || isSubmitting || isLoading}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
