import { useEffect, useRef } from "react";
import CustomDataFeed from "./datafeed";
import ErrorBoundary from "./ErrorBoundary";

interface TradingViewWidgetConfig {
  container_id: string;
  symbol: string;
  interval: string;
  library_path: string;
  auto_size?: boolean;
  height?: string;
  width?: string;
  locale?: string;
  theme?: string;
  custom_css_url?: string;
  allow_symbol_change?: boolean;
  hide_top_toolbar?: boolean;
  hide_side_toolbar?: boolean;
  toolbar_bg?: string;
  datafeed: typeof CustomDataFeed;
  overrides?: Record<string, unknown>;
  debug?: boolean;
  debug_broker?: string;
  time_frames?: Array<{
    text: string;
    resolution: string;
    description: string;
  }>;
}

interface TradingViewWidget {
  remove: () => void;
  onChartReady: (callback: () => void) => void;
  activeChart: () => {
    getPriceScale: (position: string) => { applyOptions: (options: { mode: number }) => void };
    setNeedsUpdate: () => void;
  };
}

declare global {
  interface Window {
    TradingView: {
      widget: new (config: TradingViewWidgetConfig) => TradingViewWidget;
    };
  }
}

const TradingViewChart = ({
  symbol = "00/USD",
  interval = "60",
  containerId = "tv_chart_container",
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    console.log(window.TradingView); // Check what's available in the window object
    if (
      !window.TradingView ||
      typeof window.TradingView.widget !== "function"
    ) {
      console.error("TradingView widget is not available!");
      return;
    }
    const loadTradingViewChart = () => {
      const widget = new window.TradingView.widget({
        container_id: containerId,
        symbol: symbol,
        interval: interval,
        library_path: "/static/charting_library/",
        auto_size: true,
        height: "100%",
        width: "100%",
        locale: "en",
        time_frames: [
          { text: "5y", resolution: "6M", description: "5 Years" },
          { text: "1y", resolution: "1W", description: "1 Year" },
          { text: "6m", resolution: "1D", description: "6 Month" },
          { text: "3m", resolution: "5", description: "3 Month" },
          { text: "1m", resolution: "1", description: "1 Month" },
          { text: "5d", resolution: "1W", description: "5 Days" },
          { text: "1d", resolution: "1", description: "1 Day" },
          { text: "1m", resolution: "1", description: "1 Minute" },
      ],
        theme: "dark",
        custom_css_url: "/static/charting_library/static/black.css",
        allow_symbol_change: true,
        hide_top_toolbar: false,
        hide_side_toolbar: false,
        toolbar_bg: "#131722",
        datafeed: CustomDataFeed,
        // enabled_features: ["study_templates"],

        overrides: {
          "overlayIndicator.properties.scaleMode": 1, // Logarithmic scale mode
          // Enable & Customize Price Scale
          "scalesProperties.mode": 1, // 1 = Logarithmic Scale (0 = Normal Scale)
          "scalesProperties.showPriceScale": true, // Ensures price scale is visible
          "scalesProperties.priceScalePosition": "right", // Show scale on right
          "scalesProperties.priceScaleLocation": "right", // Set to right (default)
          "scalesProperties.borderColor": "#333333", // Border for price scale
          "scalesProperties.showStudyLastValue": true, // Show last indicator value

          // Customizing Last Price Line
          "mainSeriesProperties.lastValueVisible": true, // Show last price
          "mainSeriesProperties.priceLineVisible": true, // Show horizontal price line

          "paneProperties.background": "#171B26", // Dark background
          "paneProperties.vertGridProperties.color": "#222631", // Grid color
          "paneProperties.horzGridProperties.color": "#222631",
          "scalesProperties.textColor": "#FFFFFF", // White text for axis labels

          // Candle Colors
          "mainSeriesProperties.candleStyle.upColor": "#00C176", // Green for up
          "mainSeriesProperties.candleStyle.downColor": "#FF3B30", // Red for down
          "mainSeriesProperties.candleStyle.borderUpColor": "#00C176",
          "mainSeriesProperties.candleStyle.borderDownColor": "#FF3B30",
          "mainSeriesProperties.candleStyle.wickUpColor": "#00C176",
          "mainSeriesProperties.candleStyle.wickDownColor": "#FF3B30",

          "scalesProperties.logarithmicScale": true, // Enable log scale

          // Volume bars
          volumePaneSize: "medium", // Show volume below chart
          "volumePaneProperties.volume.color.0": "#FF3B30", // Sell volume red
          "volumePaneProperties.volume.color.1": "#00C176", // Buy volume green
        },
        // charts_storage_api_version: "1.1",
        debug: true,
        debug_broker: "broker-only",
      });
      console.log(widget);
      widget.onChartReady(() => {
        const chart = widget.activeChart();
        setTimeout(() => {
          chart.getPriceScale("right").applyOptions({ mode: 1 }); // Log scale
        }, 1000);
        chart.setNeedsUpdate(); 
      });

      return () => widget && widget.remove();
    };

    loadTradingViewChart();
  }, [symbol, interval]);

  return (
    <ErrorBoundary>
      <div
        ref={chartRef}
        id={containerId}
        style={{ height: "600px", width: "100%" }}
      />
    </ErrorBoundary>
  );
};

export default TradingViewChart;
