import {
    useContract,
    useContractWrite,
    useWaitForTransaction,
  } from "@starknet-react/core";
  import { useMemo, useState, useEffect } from "react";
  import erc20ABI from './erc20ABI.json';
  import Dialog from "../components/ui/Dialog";
  import { Button } from "../components/ui/Button";
  
  function MyComponent() {
    const { contract } = useContract({
      abi: erc20ABI.abi,
      address: '0x004ef1d90e6b478f6d7ab5cdf2c2c6dd536a673603c0be84872948c1a49c3c4b',
    });
  
    const [count] = useState(1);
  
    const calls = useMemo(() => {
      if (!contract) return [];
  
      return Array.from({ length: count }, () => {
        return contract.populateTransaction["incrementCount"]!();
      });
    }, [contract, count]);
  
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
      refetchInterval: 2000,
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
        write();
      }
    };
  
    return (
      <Dialog title="Test Integration">
        <div className="flex flex-col gap-2">
          <Button onClick={handleClick} disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? 'Processing...' : 'Increment Count'}
          </Button>
          {isSubmitError && <p>Error submitting: {submitError?.message}</p>}
          {isError && <p>Transaction error: {error?.message}</p>}
          {receipt && <p>Transaction confirmed! Receipt: {JSON.stringify(receipt)}</p>}
        </div>
      </Dialog>
    );
  }
  
  export default MyComponent;