import TransactionsSvg from "@/components/icons/Transactions-svg";
import VectorSvg from "@/components/icons/Vector-svg";
import { Tab, TabPanel, Tabs, TabsHeader } from "@material-tailwind/react";
import { IconClipboardData, IconMessage } from "@tabler/icons-react";
import { useState } from "react";

const Transactions: React.FC = () => {

  const [selected, setSelected] = useState<string>("1");

  const handleChange = (_: React.SyntheticEvent, value: string) => {
    setSelected(value);
  }

  return (
    <div>
      <Tabs value={selected} onChange={handleChange}>
        <TabsHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
          className="rounded-none bg-transparent p-0 w-[400px]"
          indicatorProps={{
            className:
              "bg-transparent border-b border-white shadow-none rounded-none",
          }}
        >
          <Tab value="1" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="flex items-center py-1">
              <TransactionsSvg className="w-[20px] mr-1" />
              Transactions

            </div>
          </Tab>
          <Tab value="2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="flex items-center py-1">
              <IconMessage className="w-[20px] mr-1" />
              Comments
            </div>
          </Tab>
        </TabsHeader>
        <TabPanel value={selected} className="p-0">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-borderColor border border-gray-400 text-[11px] px-3 py-1 text-left">
                  <p className="flex items-center">DATE <IconClipboardData className="w-[20px]" /></p>
                </th>
                <th className="bg-borderColor border border-gray-400 text-[11px] px-3 py-1 text-left">TYPE</th>
                <th className="bg-borderColor border border-gray-400 text-[11px] px-3 py-1 text-left">VETH</th>
                <th className="bg-borderColor border border-gray-400 text-[11px] px-3 py-1 text-left">DOGWIFHAT</th>
                <th className="bg-borderColor border border-gray-400 text-[11px] px-3 py-1 text-left">USER</th>
                <th className="bg-borderColor border border-gray-400 text-[11px] px-3 py-1 text-left">TXN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-500 text-[11px] px-3 py-2 text-left text-textDark">about 1 month ago</td>
                <td className="border border-gray-500 text-[11px] px-3 py-2 text-left text-greenColor">BUY</td>
                <td className="border border-gray-500 text-[11px] px-3 py-2 text-left text-greenColor">0.034020</td>
                <td className="border border-gray-500 text-[11px] px-3 py-2 text-left text-greenColor">25M</td>
                <td className="border border-gray-500 text-[11px] px-3 py-2 text-left text-greenColor">0x23fdf</td>
                <td className="border border-gray-500 text-[11px] px-3 py-2 text-left"><VectorSvg className="w-[20px]" /></td>
              </tr>
              <tr>
                <td className="border border-gray-500 text-[11px] px-3 py-2 text-left text-textDark">about 1 month ago</td>
                <td className="border border-gray-500 text-[11px] px-3 py-2 text-left text-greenColor">BUY</td>
                <td className="border border-gray-500 text-[11px] px-3 py-2 text-left text-greenColor">0.034020</td>
                <td className="border border-gray-500 text-[11px] px-3 py-2 text-left text-greenColor">25M</td>
                <td className="border border-gray-500 text-[11px] px-3 py-2 text-left text-greenColor">0x23fdf</td>
                <td className="border border-gray-500 text-[11px] px-3 py-2 text-left"><VectorSvg className="w-[20px]" /></td>
              </tr>
            </tbody>
          </table>
        </TabPanel>
      </Tabs>
    </div>
  )
}
export default Transactions;