import { useState } from "react";
import { Button, Checkbox } from "@material-tailwind/react";
import BoltIcon from "@/components/icons/BoltIcon";
import {
  IconCircleCheckFilled,
  IconCircleX,
  IconClockFilled,
  IconCreditCardPay,
} from "@tabler/icons-react";
import IconText from "@/components/common/IconText";
import { BoostType } from "@/interfaces/types";

const BoostConfirm = ({
  selectedBoost,
  setSelectedBoost,
  setStatus,
}: {
  selectedBoost: BoostType;
  setSelectedBoost: (boost: BoostType | null) => void;
  setStatus: (status: string) => void;
}) => {
  const [agreed, setAgreed] = useState(false);
  return (
    <div>
      <div className="bg-[#0000006b] border border-gray-700 flex flex-col items-center p-6 rounded-lg text-center">
        <div className="hidden lg:block">
          <BoltIcon width={50} />
        </div>
        <div className="block lg:hidden">
          <BoltIcon width={30} />
        </div>
        <p className="text-3xl font-bold text-yellow-400">
          {selectedBoost.times}x
        </p>
        <p className="flex items-center gap-2">
          <IconClockFilled size={16} />
          {selectedBoost.hours} hours
        </p>
        <p className="text-xl text-white font-semibold mt-2">
          ${selectedBoost.price}
        </p>
      </div>

      <div className="text-center my-2">
        <button
          className="text-gray-400"
          onClick={() => setSelectedBoost(null)}
        >
          {"< "} <span className="hover:underline">Choose another pack</span>
        </button>
      </div>

      <div className="flex justify-center gap-6">
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center flex-1 text-center">
          <IconCircleCheckFilled size={50} color="lightgreen" />
          <p className="text-white text-lg font-semibold">Trending Boost</p>
          <p className="text-white text-sm">
            This pack will boost this token's Trending Score
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center flex-1 text-center">
          <IconCircleX size={50} color="#f45b5b" />
          <p className="text-white text-lg font-semibold">Golden Ticker</p>
          <p className="text-white text-sm">
            This pack will not unlock the Golden Ticker
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 my-2">
        <Checkbox
          checked={agreed}
          color="green"
          onChange={() => setAgreed(!agreed)}
          crossOrigin="anonymous"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <span className="text-white text-sm">
          I agree to the{" "}
          <a href="#" className="text-white underline">
            Boosting Terms and Conditions
          </a>
        </span>
      </div>

      <Button
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        onClick={() => setStatus("payment")}
        className="w-full flex justify-center bg-blue-600 text-white font-bold mb-4"
        disabled={!agreed}
      >
        <IconText className="gap-2">
          <span className="text-[16px] text-white">Proceed to Payment</span>
          <IconCreditCardPay color="white" size={20} />
        </IconText>
      </Button>
    </div>
  );
};

export default BoostConfirm;
