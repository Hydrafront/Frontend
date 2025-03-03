import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { IconApps, IconHeartFilled } from "@tabler/icons-react";
import clsx from "clsx";
import React from "react";

interface optionsType {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const options: optionsType[] = [
  { icon: <IconApps className="mr-2 w-[18px]" />, title: "All Presales", value: "all_presales" },
  // { icon: <IconApps className="mr-2 w-[18px]" />, title: "My Contributions", value: "my_contributions" },
  { icon: <IconHeartFilled className="mr-2 w-[18px]" />, title: "Favorites", value: "favorites" }
]

interface PropsType {
  tab: string,
  setTab: (value: string) => void
}

const Categories: React.FC<PropsType> = ({ tab, setTab }) => {

  const handleChange = (value: string) => () => {
    setTab(value);
  }

  return (
    <Tabs value={tab} className="w-[430px]">
      <TabsHeader
        className="rounded-none bg-transparent p-0"
        indicatorProps={{
          className: "bg-transparent border-b border-white shadow-none rounded-none",
        }}
        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
      >
        {
          options.map((item: optionsType, index) => (
            <Tab key={index} onClick={handleChange(item.value)} value={item.value} className="text-white py-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <div className={clsx("flex items-center text-[13px]", tab === item.value ? "text-white" : "text-gray-500")}>{item.icon}{item.title}</div>
            </Tab>
          ))
        }
      </TabsHeader>
    </Tabs>
  )
}
export default Categories;