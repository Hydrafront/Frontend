import { Outlet } from "react-router";
import LeftSidebar from "./LeftSidebar";
import Popup from "./Popup";
import LeftDrawer from "./LeftDrawer";
import clsx from "clsx";

const LaunchPad: React.FC = () => {
  return (
    <>
      <div className="relative">
        {/* <div className="flex 2xl:h-[calc(100vh-88px)] xl:h-[calc(100vh-84px)] h-[calc(100vh-80px)] justify-between"> */}
        <div className="flex justify-between">
          <LeftDrawer />
          <div className="border-borderColor border-r hidden lg:block">
            <LeftSidebar />
          </div>
          <div className={clsx("border-borderColor border-r", `page-content`)}>
            <Outlet />
          </div>
          {/* {prePathname !== "presale-detail" &&
            prePathname !== "manage-position" && (
              <div className="hidden xl:block w-[14vw] px-1">
                <RightSidebar />
              </div>
            )}
          {prePathname !== "presale-detail" &&
            prePathname !== "manage-position" && <RightDrawer />} */}
          <Popup />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};
export default LaunchPad;
