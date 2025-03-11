import { useCallback, useEffect, useState } from "react";
import CustomDialogHeader from "@/components/common/CustomDialogHeader";
import { useAppDispatch } from "@/store/hooks";
import { closeDialog, openDialog } from "@/store/reducers/dialog-slice";
import { useUserBalance } from "@/utils/contractUtils";

import {
  Button,
  DialogBody,
  DialogFooter,
  Input,
  Switch,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";

import { getChainName } from "@/utils/config/chainDexConfig";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import BuyTab from "./BuyTab";
import SellTab from "./SellTab";

const TokenBuyAndSell = () => {
  const [selected, setSelected] = useState<string>("buy");
  const dispatch = useAppDispatch();
  const { tokenAddress, chainId } = useParams();
  const { address } = useAccount();
  const {
    refetch: refetchUserBalance,
    balance: fetchedBalance,
    tokenBalance: fetchedTokenBalance,
  } = useUserBalance(address as `0x${string}`, tokenAddress as `0x${string}`);
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [tokenBalance, setTokenBalance] = useState<number>(0);

  const fetchAllData = useCallback(() => {
    refetchUserBalance();
  }, [refetchUserBalance]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    if (fetchedBalance) {
      setBalance(parseFloat(formatUnits(fetchedBalance, 18)));
    }
    if (fetchedTokenBalance) {
      setTokenBalance(parseFloat(formatUnits(fetchedTokenBalance, 18)));
    }
  }, [fetchedBalance, fetchedTokenBalance]);

  const handleOpenFeeDialog = () => {
    dispatch(
      openDialog({
        children: (
          <>
            <CustomDialogHeader>
              <h5>Trade Setting</h5>
            </CustomDialogHeader>
            <DialogBody
              className="p-6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div className="flex justify-between items-center mb-3">
                <span>Front running protection</span>
                <Switch
                  crossOrigin={"false"}
                  color="green"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
              <p className="text-textDark text-sm mb-6">
                Front-running protection prevents{" "}
                <Link to="#" className="text-white">
                  sandwich
                </Link>{" "}
                attacks on your swaps. With this feature enabled you can safely
                use high slippage.
              </p>
              <h6 className="text-white mb-3">Prioity fee</h6>
              <div className="border overflow-hidden border-borderColor rounded-md mb-3">
                <div className="relative">
                  <div className="flex gap-2 absolute left-2 top-1/2 z-[999] -translate-y-1/2">
                    <img
                      src={`/assets/images/chains/${getChainName(
                        Number(chainId)
                      )}.png`}
                      alt="polygon-icon"
                      className="w-6"
                    />
                    <span>POL</span>
                  </div>
                  <Input
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    type="number"
                    value={0.002}
                    min={0}
                    crossOrigin={"false"}
                    labelProps={{ className: "content-none" }}
                    className={clsx(
                      "placeholder:opacity-50 text-gray-500 border-none mb-3 pl-[100px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    )}
                  />
                </div>
                <div className="flex gap-[1px]">
                  {[0, 0.002, 0.005, 0.01, 0.015, 0.02].map((item) => (
                    <button
                      key={item}
                      className="text-[13px] py-1 bg-lighterColor w-1/6 hover:bg-lightestColor transition"
                    >
                      {item}%
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-textDark text-sm">
                A higher priority fee will speed up the confirmation of your
                transactions.
              </p>
            </DialogBody>
            <DialogFooter
              className="justify-center gap-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Button
                color="green"
                className="text-lg py-1"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Save
              </Button>
              <Button
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                color="white"
                className="text-lg py-1"
                variant="text"
                onClick={() => dispatch(closeDialog())}
              >
                Cancel
              </Button>
            </DialogFooter>
          </>
        ),
        size: "sm",
      })
    );
  };

  return (
    <div className="border border-borderColor rounded-md">
      <Tabs value={selected}>
        <TabsHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="rounded-t-md rounded-b-none overflow-hidden bg-bgColor p-0 border-b border-borderColor"
          indicatorProps={{ className: "bg-lightestColor rounded-none" }}
        >
          <Tab
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            value="buy"
            className="text-green-400"
            onClick={() => setSelected("buy")}
          >
            BUY
          </Tab>
          <Tab
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            value="sell"
            className="text-red-400"
            onClick={() => setSelected("sell")}
          >
            SELL
          </Tab>
        </TabsHeader>
        <TabsBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <TabPanel value="buy">
            <BuyTab
              openFeeDialog={handleOpenFeeDialog}
              balance={balance}
              tokenBalance={tokenBalance}
            />
          </TabPanel>
          <TabPanel value="sell">
            <SellTab
              openFeeDialog={handleOpenFeeDialog}
              balance={balance}
              tokenBalance={tokenBalance}
            />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

//-----------------Buy Tab-----------------

export default TokenBuyAndSell;
