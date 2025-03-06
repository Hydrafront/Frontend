import TransactionsSvg from "@/components/icons/Transactions-svg";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { IconMedal2 } from "@tabler/icons-react";
import { useState } from "react";
import TransactionTable from "./TransactionTable";
import ScrollOnDrag from "@/components/ui/ScrollOnDrag";
import TopTraders from "./TopTrader";
import clsx from "clsx";
const Transactions: React.FC = () => {
  const [selected, setSelected] = useState<string>("1");

  return (
    <div className="transaction-tab">
      <Tabs value={selected}>
        <ScrollOnDrag>
          <TabsHeader
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="rounded-none bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b border-white shadow-none rounded-none",
            }}
          >
            <Tab
              className="w-auto px-4"
              onClick={() => setSelected("1")}
              value="1"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div
                className={clsx(
                  "flex items-center py-1",
                  selected === "1" ? "text-white" : "text-textDark"
                )}
              >
                <TransactionsSvg className="w-[20px] mr-1" />
                Txns
              </div>
            </Tab>
            <Tab
              className="w-auto px-4"
              onClick={() => setSelected("2")}
              value="2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div
                className={clsx(
                  "flex items-center py-1",
                  selected === "2" ? "text-white" : "text-textDark"
                )}
              >
                <IconMedal2
                  className="w-[20px] mr-1"
                  color={selected === "2" ? "white" : "grey"}
                />
                Top Traders
              </div>
            </Tab>
            {/* <Tab
              className="w-auto px-4"
              onClick={() => setSelected("3")}
              value="3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div
                className={clsx(
                  "flex items-center py-1",
                  selected === "3" ? "text-white" : "text-textDark"
                )}
              >
                <IconDiamondFilled
                  className="w-[20px] mr-1"
                  color={selected === "3" ? "white" : "grey"}
                />
                Holders (34)
              </div>
            </Tab> */}
          </TabsHeader>
        </ScrollOnDrag>
        <TabsBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <TabPanel value="1" className="p-0">
            <TransactionTable />
          </TabPanel>
          <TabPanel value="2" className="p-0">
            <TopTraders />
          </TabPanel>
          {/* <TabPanel value={selected} className="p-0">
          
          </TabPanel> */}
        </TabsBody>
      </Tabs>
    </div>
  );
};
export default Transactions;
