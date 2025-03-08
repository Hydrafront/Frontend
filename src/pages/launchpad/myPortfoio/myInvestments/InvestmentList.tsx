// import { presaleData } from "@/utils/config/common";
// import InvestmentCard from "./InvestmentCard";
// import { PresaleCardType } from "../../managePresale/PresaleCard";

// const typedPresaleData = presaleData as unknown as PresaleCardType[];

const InvestmentList: React.FC = () => {
  return (
    <div className="overflow-y-scroll h-[calc(100vh-318.55px)]">
      {/* {typedPresaleData
        .filter(item => item.step === step)
        .map((item, index) => (
          <div key={index} className="w-full">
            <InvestmentCard {...item} />
          </div>
        ))} */}
    </div>
  );
};

export default InvestmentList;