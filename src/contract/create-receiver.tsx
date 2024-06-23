import {
    useAccount,
    useContract,
    useContractWrite,
    useWaitForTransaction,
  } from "@starknet-react/core";
  import { useMemo, useState, useEffect } from "react";
  import config from "./config";
  import Dialog from "../components/ui/Dialog";
  import { Button } from "../components/ui/Button";
  import * as starknet from "starknet";
import axios from "axios";
  

  function AddReceiver(props:{emitter: string}) {
    const { address } = useAccount();
    console.log(starknet.typedData.byteArrayFromString("test"))
    const { contract } = useContract({
      abi: config.CONTRACT_ABI,
      address: config.CONTRACT_ADDRESS,
    });
    const [count] = useState(1);
  
    const calls = useMemo(() => {
      console.log(address);
      console.log(contract);
      if (!contract || !address) return [];
      return Array.from({ length: count }, () => {
        return contract.populateTransaction["addReceiver"]!(
          starknet.typedData.byteArrayFromString(props.emitter??"test"),
          starknet.typedData.byteArrayFromString(`${address}`),
        );
      });
    }, [contract, address, count]);
  
    const {
      write,
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
  
    useEffect(() => {
      console.log("Contract:", contract);
      console.log("Calls:", calls);
    }, [contract, calls]);
  
    useEffect(() => {
      console.log("Transaction:", tx);
      console.log("Is Submitting:", isSubmitting);
      console.log("Submit Error:", submitError);
    }, [tx, isSubmitting, submitError]);
  
    useEffect(() => {
      console.log("Receipt:", receipt);
      console.log("Is Loading:", isLoading);
      console.log("Error:", error);
    }, [receipt, isLoading, error]);
  
    const handleClick = () => {
      if (write) {
        console.log("Initiating transaction...");
        axios.post(config.BACKEND_URL + "subscribe", {
          receiverAddress: address,
          emitterAddress: props.emitter
        });
        write();
      }
    };
  
    return (
      <Dialog title="Optin">
        <div className="flex flex-col gap-2">
          <Button onClick={handleClick} disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? "Sent to L2" : "Optin"}
          </Button>
          {isLoading && <p>Transaction Hash: {tx?.transaction_hash}</p>}
          {isSubmitError && <p>Error submitting: {submitError?.message}</p>}
          {isError && <p>Transaction error: {error?.message}</p>}
          {receipt && (
            <p>Transaction confirmed! Receipt: {JSON.stringify(receipt)}</p>
          )}
        </div>
        <p>status: {isSubmitting && <div>Submitting...</div>}</p>
      </Dialog>
    );
  }
  
  export default AddReceiver;
  