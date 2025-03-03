import LeftSidebar from "./LeftSideBar";
import RightSidebar from "./RightSideBar";
import Transactions from "./Transactions";
import TradingViewWidget from "@/components/ui/trading-view";
// import LeftDrawer from "./LeftDrawer";
import RightDrawer from "./RightDrawer";
import { useParams } from "react-router";

const ManagePosition: React.FC = () => {
  const { isRegular } = useParams();
  return (
    <>
      {/* <div className="flex 2xl:h-[calc(100vh-85px)] xl:h-[calc(100vh-83px)] sm:h-[calc(100vh-80px)] h-[calc(100vh-63px)] justify-between"> */}
      <div className="flex justify-between">
        <div className="pt-3 px-4 w-full border-borderColor border-r">
          <div className="xl:flex">
            <LeftSidebar isRegular={isRegular} />
            {/* <BitRivals /> */}
            <div className="w-full mt-6 xl:mt-0 xl:pl-4">
              <div className="h-[500px] p-2 border-2 border-borderColor">
                <TradingViewWidget />
              </div>
            </div>
          </div>
          <Transactions />
        </div>
        <div className=" hidden xl:block">
          <RightSidebar isRegular={isRegular} />
        </div>
        <RightDrawer />
      </div>
    </>
  );
};
export default ManagePosition;
