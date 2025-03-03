import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Presale", value: 400 },
  { name: "Liquidity", value: 108 },
  { name: "Locked-ETHQ8 CEX LOXK", value: 96.733 },
  { name: "Locked-TREASURE LOCK SAFE", value: 107.547 },
  { name: "Unlocked", value: 287.72 },
];

const COLORS = ["#0CAF60", "#00B8D9", "#A74AF9", "#A74AF9", "#FF4842"];

const status = [
  { name: "Mintable", status: false },
  { name: "Burnable", status: true },
  { name: "Upgradable", status: true },
  { name: "Freezable", status: false },
  { name: "Mutable", status: false },
  { name: "Dex", status: false },
];

const Recharts = () => {
  return (
    <div className="flex flex-wrap items-center">
      <div className="relative w-full md:w-2/5">
        <PieChart width={250} height={300} className="m-auto">
          <Pie
            data={data}
            color="#000000"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={80}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div
          className="text-white text-center absolute z-[999] left-[50%] top-[50%]"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <p>Total</p>
          <h4>100%</h4>
        </div>
      </div>
      <div className="w-full md:w-3/5">
        <div className="flex flex-wrap items-center">
          <div className="w-1/2 flex justify-center px-2">
            <ul>
              {data.map((item, index) => (
                <li key={index} className="flex items-center">
                  <div>
                    <div
                      className="w-4 h-4 rounded-full mr-4"
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                  </div>
                  <p>
                    {item.name}: {parseFloat((item.value / 10).toFixed(3))}%
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2 px-2 md:border-l md:pl-6 flex justify-center md:justify-end">
            <table>
              <tbody>
                {status.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b">{item.name}:</td>
                    <td className="border px-4">
                      {item.status ? (
                        <IconCheck color="green" />
                      ) : (
                        <IconX color="red" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between px-3 mt-6">
          <h6>Initial Supply: 10000000</h6>
          <h6>Max Supply: 10000000</h6>
        </div>
      </div>
    </div>
  );
};

export default Recharts;
