import { IconTrendingUp } from "@tabler/icons-react";
import Marquee from "react-fast-marquee";

interface bitType {
  name: string;
  image: string;
}

const bitArr: bitType[] = [
  { name: "KOLZ", image: "/assets/images/bitrivals/1.png" },
  { name: "BNOM", image: "/assets/images/bitrivals/2.png" },
  { name: "PKC", image: "/assets/images/bitrivals/3.png" },
  { name: "SRIVAL", image: "/assets/images/bitrivals/4.png" },
  { name: "BDToken", image: "/assets/images/bitrivals/5.png" },
  { name: "KLLR", image: "/assets/images/bitrivals/6.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
  { name: "DBB", image: "/assets/images/bitrivals/7.png" },
];

const TrendingBar
: React.FC = () => {
  return (
    <div className="flex justify-between p-5 px-0 w-full bitribals">
      <div className="flex items-center w-full">
        <div className="items-center hidden xl:flex">
          <div className="flex py-2 px-3 items-center justify-center w-[110px] bg-[#15131D] rounded-[64px]">
            {/* <img src="/assets/images/bit_rials.png" alt="bit-rials" width={28.8} height={28.8} className="rounded-md" /> */}
            <span className="font-bold text-[14px] ml-1 text-greenColor">
              Trending
            </span>
          </div>
          <IconTrendingUp className="ml-3 mr-6 w-[30px]" color="green" />
        </div>
        <div className="flex justify-between overflow-hidden pb-2">
          <Marquee>
            {bitArr.map((item: bitType, index) => (
              <div
                key={index}
                className="flex items-center mr-3 bg-lighterColor pr-2 rounded-md cursor-pointer hover:bg-[#322d45] transition"
              >
                <div>
                  <div className="w-[40px] h-[40px] text-[12px] p-1 rounded-md flex justify-center items-center text-white">
                    <img
                      src={item.image}
                      alt="bitrivals"
                      className="w-full h-full rounded-md"
                    />
                  </div>
                </div>
                <span className="text-[13px] mx-2">{item.name}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};
export default TrendingBar
;
