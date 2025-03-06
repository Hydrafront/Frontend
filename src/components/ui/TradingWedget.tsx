import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode, IChartApi } from "lightweight-charts";

const TradingWedget = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chartRef.current && !chartRef.current.innerHTML) {
      const chart: IChartApi = createChart(chartRef.current, {
        width: chartRef.current.clientWidth,
        height: 500,
        layout: {
          background: { color: "#1f2937" },
          textColor: "#d1d5db",
        },
        grid: {
          vertLines: { color: "rgba(255, 255, 255, 0.1)" },
          horzLines: { color: "rgba(255, 255, 255, 0.1)" },
        },
        rightPriceScale: {
          borderColor: "rgba(255, 255, 255, 0.2)",
          visible: true,
          borderVisible: true,
          alignLabels: true,
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
          autoScale: false,
        },
        timeScale: {
          borderColor: "rgba(255, 255, 255, 0.2)",
          timeVisible: true,
          secondsVisible: false,
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        watermark: {
          color: "rgba(255, 255, 255, 0.1)",
          visible: true,
          text: "Bondle.xyz",
          fontSize: 28,
          horzAlign: "center",
          vertAlign: "center",
        },
      });
      const candleSeries = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
      candleSeries.setData([
        {
          time: "2019-04-11",
          open: 80.01,
          high: 96.63,
          low: 76.64,
          close: 81.89,
        },
        {
          time: "2019-04-12",
          open: 96.63,
          high: 76.64,
          low: 81.89,
          close: 74.43,
        },
        {
          time: "2019-04-13",
          open: 76.64,
          high: 81.89,
          low: 74.43,
          close: 80.01,
        },
        {
          time: "2019-04-14",
          open: 81.89,
          high: 74.43,
          low: 80.01,
          close: 76.64,
        },
        {
          time: "2019-04-15",
          open: 74.43,
          high: 80.01,
          low: 76.64,
          close: 81.89,
        },
      ]);
      chart.timeScale().fitContent();
      chart.priceScale("right").applyOptions({
        autoScale: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      });
    }
  }, []);
  return <div ref={chartRef} className="w-full h-full"></div>;
};

export default TradingWedget;
