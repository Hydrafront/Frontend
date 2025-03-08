import { useEffect, useRef, useState } from "react";
import {
  createChart,
  CrosshairMode,
  IChartApi,
  Time,
} from "lightweight-charts";
import { useAppSelector } from "@/store/hooks";
import { aggregateTransactionsToCandles } from "@/utils/func";
import { Candle } from "@/interfaces/types";

const TradingWedget = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { transactions } = useAppSelector((state) => state.token);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [chart, setChart] = useState<IChartApi | null>(null);

  useEffect(() => {
    if (transactions.length > 0) {
      const candles = aggregateTransactionsToCandles(transactions);
      setCandles(candles);
    }
  }, [transactions]);

  useEffect(() => {
    if (chartRef.current && !chartRef.current.innerHTML && candles.length >= 0) {
      const newChart: IChartApi = createChart(chartRef.current, {
        width: chartRef.current.clientWidth,
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
      const candleSeries = newChart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
      candleSeries.setData(
        candles.map((candle) => ({
          time: candle.time as Time,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
        }))
      );
      newChart.priceScale("right").applyOptions({
        autoScale: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      });
      setChart(newChart);

      return () => {
        newChart.remove();
      };
    }
  }, [candles]);

  useEffect(() => {
    const handleResize = () => {
      if (chart && chartRef.current) {
        chart.applyOptions({ width: chartRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [transactions, chart]);
  return <div ref={chartRef} className="w-full h-full"></div>;
};

export default TradingWedget;
