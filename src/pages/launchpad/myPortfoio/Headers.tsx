import { Tabs, Tab, TabsHeader } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Headers: React.FC = () => {
  const [selected, setSelected] = useState<string>("Token");
  const navigate = useNavigate();

  const handleChange = (_: React.SyntheticEvent, value: string) => {
    setSelected(value);
  }

  const handleNavigate = (url: string) => () => {
    navigate(`/my-portfolio${url}`)
  }

  return (
    <div className="flex justify-between pr-10">
      <Tabs value={selected} onChange={handleChange} className="w-[400px] m-auto md:m-0">
        <TabsHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
          className="rounded-none bg-transparent p-0 text-borderColor"
          indicatorProps={{
            className:
              "bg-transparent border-b border-white shadow-none rounded-none text-orange-500",
          }}
        >
          <Tab placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} activeClassName="active-orange" className="pb-2 text-gray-500 whitespace-nowrap" value="Token" onClick={handleNavigate("/tokens")}>Token</Tab>
          <Tab placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} activeClassName="active-orange" className="pb-2 text-gray-500 whitespace-nowrap" value="My Investments" onClick={handleNavigate("/my-investments")}>My Investments</Tab>
          <Tab placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} activeClassName="active-orange" className="pb-2 text-gray-500 whitespace-nowrap" value="History" onClick={handleNavigate("/history")}>History</Tab>
        </TabsHeader>
      </Tabs>
      <h5 className="hidden md:block">All Networks</h5>
    </div>
  )
}
export default Headers;