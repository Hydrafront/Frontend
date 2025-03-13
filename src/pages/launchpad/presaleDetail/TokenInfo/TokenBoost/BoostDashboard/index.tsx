import { useState } from "react";
import IconText from "@/components/common/IconText";
import { IconX } from "@tabler/icons-react";
import BoostList from "./BoostList";
import BoltIcon from "@/components/icons/BoltIcon";
import BoostPayment from "./BoostPayment";
import BoostConfirm from "./BoostConfirm";
import { closeDialog } from "@/store/reducers/dialog-slice";
import { BoostType } from "@/interfaces/types";
import { useAppDispatch } from "@/store/hooks";

const BoostDashboard = () => {
    const dispatch = useAppDispatch();

    const [selectedBoost, setSelectedBoost] = useState<BoostType | null>(null);
    const [status, setStatus] = useState<"boost" | "payment">("boost");
  
    const handleClose = () => {
        dispatch(closeDialog());
      };

  return (
    <div>
      {status === "boost" ? (
        <div
          className="px-8 bg-lightColor pb-4 pt-3 rounded-t-lg"
          style={{
            backgroundImage: "radial-gradient(circle,#f0b90b1f, #211E2C)",
          }}
        >
          <div className="flex justify-end -mr-4">
            <button onClick={handleClose}>
              <IconX />
            </button>
          </div>
          <div className="flex text-[20px] lg:text-[30px] justify-center gap-3 mb-4 text-white">
            Give{" "}
            <span className="text-orangeColor whitespace-nowrap">
              TOKEN NAME
            </span>{" "}
            a{" "}
            <span>
              <IconText className="text-orangeColor">
                <div className="hidden lg:block">
                  <BoltIcon width={40} />
                </div>
                <div className="block lg:hidden">
                  <BoltIcon width={30} />
                </div>
                Boost
              </IconText>
            </span>
          </div>
          <p className="text-white mb-4 text-center">
            Showcase your support, boost Trending Score and unlock the Golden
            Ticker!
          </p>
          {!selectedBoost ? (
            <BoostList setSelectedBoost={setSelectedBoost} />
          ) : (
            <BoostConfirm selectedBoost={selectedBoost} setSelectedBoost={setSelectedBoost} setStatus={setStatus} />
          )}
        </div>
      ) : (
        <BoostPayment selectedBoost={selectedBoost} />
      )}
    </div>
  );
};

export default BoostDashboard;
