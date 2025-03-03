import { Outlet } from "react-router";
import Headers from "./Headers";

const MyPortfolio: React.FC = () => {
  return (
    <div className="pl-[4.3vw] lg:pl-[2.2vw]">
      <Headers />
      <div className="overflow-y-scroll h-[calc(100vh-213px)]">
        <Outlet />
      </div>
    </div>
  )
}
export default MyPortfolio;