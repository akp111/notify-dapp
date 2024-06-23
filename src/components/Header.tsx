import { useAccount, useDisconnect } from "@starknet-react/core";
import ConnectModal from "./starknet/ConnectModal";
import { Link } from "react-router-dom";
// import MyComponent from "../server/send-transaction";

export default function Header() {
  const { address} = useAccount();
  const { disconnect } = useDisconnect();

  // if (isConnecting) {
  //   return <div>Connecting...</div>;
  // }

  // if (isDisconnected) {
  //   return <ConnectModal />;
  // }

  return (
    <div className="flex justify-between z-10 relative items-center w-screen px-16 py-4 bg-blue-950 border-b-4  border-b-rose-400 ">
      <div className="flex gap-2 items-center">
        <span className="text-2xl font-extrabold tracking-wider text-zinc-200">
         Notify
        </span>
      </div>
      <div className="flex gap-8 text-lg font-medium items-center text-neutral-300">
        <span className="cursor-pointer ">About</span>
        <span className="cursor-pointer">Home</span>
        <span className="cursor-pointer">Contact</span>
        <Link to={'/dashboard'}>
        <button>Launch App</button>
        </Link>
        {address ? (
          <div className="flex flex-col items-end bg-rose-400 rounded-md px-6 py-2">
            <p className="font-semibold text-blue-950">{`${address.slice(
              0,
              6
            )}...${address.slice(-4)}`}</p>
            <p
              onClick={() => disconnect()}
              className="cursor-pointer  text-white"
            >
              Disconnect
            </p>
          </div>
        ) : (
          <ConnectModal />
        )}{" "}
      </div>
    </div>
  );
}