import  { useMemo, useState } from "react";
import {
  useAccount,
  useContract,
  useContractWrite,
  useWaitForTransaction,
} from "@starknet-react/core";
import config from "../contract/config";
import * as starknet from "starknet";
import axios from "axios";

export default function SendNotif() {
  const { address: userAddress } = useAccount();
  const { contract } = useContract({
    abi: config.CONTRACT_ABI,
    address: config.CONTRACT_ADDRESS,
  });
  const [address,setAddress] = useState<Array<string>>([]);
  const [title,settitle] = useState('');
  const [body,setBody] = useState('');

  const calls = useMemo(() => {
    if (!contract || !address) return [];

    console.log("calls created");
    return contract.populateTransaction["sendNotification"]!(
      starknet.typedData.byteArrayFromString(`${userAddress}`),
      starknet.typedData.byteArrayFromString(address.join(",")),
      starknet.typedData.byteArrayFromString(JSON.stringify({title, body})),
    );
  }, [contract, address, title, body, userAddress]);

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
    // refetchInterval: 2000,
  });


  const action = () => {
    if (receipt) {
      reset()
    } else {
      axios.post(config.BACKEND_URL + "notify/sendNotification", {
        receiverAddress: address,
        emitterAddress: userAddress,
        payload: {
          title,
          body
        }
      });
      write();
    }
  };

  
  return (
    <div className="flex h-full w-full justify-center my-16 ">
      <div className="flex rounded-xl bg-slate-50 flex-col items-center p-6 px-8 w-1/3 gap-6">
      <p className="text-2xl font-semibold">  Send Notifications</p>

      <div className="flex flex-col gap-2 w-full ">
          <label>Notification Title</label>
          <input className="h-[40px] rounded-md border-2 p-2" type="text" name="name" value={title} onChange={(e)=>settitle(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 w-full ">
          <label>Notification Body</label>
          <textarea className="h-[80px] rounded-md border-2 p-2"  name="name" value={body} onChange={(e)=>setBody(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Address </label>
          <input className="h-[40px] rounded-md border-2 p-2" type="text" name="desc" placeholder="Enter comma separated addresses"  value={address} onChange={(e)=>setAddress(e.target.value.split(','))} />
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
