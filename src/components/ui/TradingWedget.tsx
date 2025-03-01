import React from "react";
import {
  AdvancedRealTimeChart,
  AdvancedRealTimeChartProps,
} from "react-ts-tradingview-widgets";

const TradingWedget: React.FC<AdvancedRealTimeChartProps> = (props) => {
  return (
    <AdvancedRealTimeChart
      width="100%"
      height="100%"
      symbol="BTCUSDT"
      details={true}
      hotlist={true}
      interval="1"
      theme="dark"
      {...props}
    />
  );
};

export default TradingWedget;
