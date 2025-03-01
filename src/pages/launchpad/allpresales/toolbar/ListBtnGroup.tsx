import { IconApps, IconList } from "@tabler/icons-react";
import clsx from 'clsx';

interface PropsType {
  style: string;
  setStyle: (value: string) => void
}

const ListBtnGroup: React.FC<PropsType> = ({ style, setStyle }) => {
  return (
    <div className="bg-lightColor rounded-[6px] flex p-1">
      <div className={clsx("px-3 py-1 rounded-[8px] cursor-pointer", style === "apps" && " bg-[#AF6B0C29]")} onClick={() => setStyle("apps")}>
        <IconApps className={clsx("w-[16px]", style === "apps" && "text-[#F6851B]")} />
      </div>
      <div className={clsx("px-3 py-1 rounded-[8px] cursor-pointer", style === "table" && " bg-[#AF6B0C29]")} onClick={() => setStyle("table")}>
        <IconList className={clsx("w-[16px]", style === "table" && "text-[#F6851B]")} />
      </div>
    </div>
  )
}
export default ListBtnGroup;