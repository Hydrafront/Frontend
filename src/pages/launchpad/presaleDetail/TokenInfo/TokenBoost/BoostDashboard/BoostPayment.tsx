import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "@material-tailwind/react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import CustomSelect from "@/components/common/CustomSelect";
import { BoostType } from "@/interfaces/types";
import { closeDialog } from "@/store/reducers/dialog-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";
import {  openLoading } from "@/store/reducers/loading-slice";
import { updateBoost } from "@/store/actions/token.action";

const NETWORKS = [{ name: "Polygon", id: "80002" }];

const TOKEN_OPTIONS: Record<string, { name: string; address: string }[]> = {
  "80002": [
    { name: "USDC", address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" },
    { name: "POL", address: "0x0000000000000000000000000000000000001010" }, // Native MATIC (POL)
  ],
};

const BoostPayment = ({ selectedBoost }: { selectedBoost: BoostType }) => {
  const [selectedNetwork, setSelectedNetwork] = useState("80002");
  const { ethPrice } = useAppSelector((state) => state.eth);
  const [selectedToken, setSelectedToken] = useState("USDC");
  const dispatch = useAppDispatch();
  const { isConnected } = useAccount();
  const { token } = useAppSelector((state) => state.token);
  const { open } = useWeb3Modal();
  const { data: hash, isPending, error: transactionError, sendTransaction } = useSendTransaction();

  const handleNetworkChange = (network: string) => {
    setSelectedNetwork(network);
    setSelectedToken("USDC"); // Default to USDC when switching
  };

  const handleTokenChange = (token: string) => {
    setSelectedToken(token);
  };

  const handleConnectWallet = () => {
    open();
    dispatch(closeDialog());
  };

  const handlePayment = async () => {
    if (!isConnected) {
      return alert("Please connect your wallet.");
    }

    const tokenData = TOKEN_OPTIONS[selectedNetwork].find(
      (t) => t.name === selectedToken
    );
    if (!tokenData) return alert("Invalid token selected.");

    // const tokenAddress = tokenData.address;

    if (selectedToken === "USDC") {
      // ERC-20 USDC transfer
      // try {
      //  await sendTransaction({
      //     to: "0x562Bc07f2D3a5972849A7A04d628Fd2A12F8aCF1",
      //     value: ethers.parseUnits(selectedBoost.price.toString(), 6),
      //   });
      // } catch (error) {
      //   toast.error("Payment Failed: " + error);
      // }
    } else {
      // Send native MATIC (POL) on Polygon
      try {
        await sendTransaction({
          to: import.meta.env.VITE_PAYMENT_ADDRESS as `0x${string}`,
          value: ethers.parseEther(
            (selectedBoost.price / Number(ethPrice[selectedNetwork])).toString()
          ),
        });
      } catch (error) {
        toast.error("Boost payment failed");
      }
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: hash,
    });

  useEffect(() => {
    if (isConfirming) {
      dispatch(
        openLoading({ text: "Waiting for confirmation...", isLoading: true })
      );
    }
    if (isConfirmed) {
      dispatch(
        updateBoost(token?.tokenAddress as `0x${string}`, selectedBoost.times)
      );
    }
    if (transactionError) {
      toast.error("Payment Failed: " + transactionError);
    }
  }, [isConfirming, isConfirmed, transactionError, token?.tokenAddress, selectedBoost.times, dispatch]);

  return (
    <div className="bg-lightestColor p-6 rounded-lg text-white">
      <div className="flex items-center gap-2 mb-4">
        <img
          src={
            selectedToken === "USDC"
              ? "/assets/images/usdc-icon.png"
              : "/assets/images/chains/Polygon.png"
          }
          alt="usdc-icon"
          className="w-8 h-8"
        />
        <h2 className="text-lg font-semibold">Pay with {selectedToken}</h2>
      </div>
      <p>
        Total price:{" "}
        <strong>
          {selectedToken === "USDC"
            ? "$" + selectedBoost.price
            : (selectedBoost.price / Number(ethPrice[selectedNetwork])).toFixed(
                2
              )}{" "}
          {selectedToken}
        </strong>
      </p>

      {/* Network Selection */}
      <div className="mt-4">
        <h3 className="text-sm mb-2">Network</h3>
        <div className="flex space-x-2">
          {NETWORKS.map((net) => (
            <button
              key={net.id}
              className={`px-4 py-2 rounded-md bg-lighterColor ${
                selectedNetwork === net.id ? "border-2 border-orange-500" : ""
              }`}
              onClick={() => handleNetworkChange(net.id)}
            >
              {net.name}
            </button>
          ))}
        </div>
      </div>

      {/* Token Selection */}
      <div className="mt-4">
        <h3 className="text-sm mb-2">Pay with</h3>
        <CustomSelect
          options={TOKEN_OPTIONS[selectedNetwork].map((token) => ({
            title: token.name,
            value: token.name,
          }))}
          value={selectedToken}
          onChange={(value) => handleTokenChange(value as string)}
        />
      </div>

      {!isConnected ? (
        <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="bg-orange-500 w-full mt-4"
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </Button>
      ) : (
        <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          disabled={isPending}
          onPointerLeaveCapture={undefined}
          className="bg-green-500 w-full mt-4"
          onClick={handlePayment}
        >
          {isPending ? "Processing..." : "Pay Now"}
        </Button>
      )}
    </div>
  );
};

export default BoostPayment;
