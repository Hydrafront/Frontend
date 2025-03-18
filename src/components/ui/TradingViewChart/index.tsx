import { useEffect, useRef } from "react";
import CustomDataFeed from "./datafeed";
import ErrorBoundary from "./ErrorBoundary";
import type {
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  TradingTerminalWidgetOptions,
  ResolutionString,
  IBasicDataFeed,
  IChartWidgetApi,
} from "./charting_library";
import { useAppSelector } from "@/store/hooks";
import clsx from "clsx";

declare global {
  interface Window {
    TradingView: {
      widget: new (
        config: ChartingLibraryWidgetOptions | TradingTerminalWidgetOptions
      ) => IChartingLibraryWidget;
    };
  }
}

const TradingViewChart = ({
  symbol = "00/USD",
  containerId = "tv_chart_container",
  interval = "60",
}: {
  symbol?: string;
  containerId?: string;
  interval?: string;
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartContainer = useRef<IChartingLibraryWidget | null>(null);
  const { tab } = useAppSelector((state) => state.token);

  const widgetOptions: ChartingLibraryWidgetOptions | IChartWidgetApi = {
    debug: true,
    autosize: true,
    symbol: symbol,
    // fullscreen: true,
    // height: '',
    timezone: "exchange",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    theme: "Dark",
    locale: "en",
    favorites: {
      intervals: ["5", "60"] as ResolutionString[],
      // indicators: ["Awesome Oscillator", "Bollinger Bands"],
      // drawingTools: ['LineToolBrush', 'LineToolCallout', 'LineToolCircle'],
      chartTypes: ["Area", "Candles"],
    },
    // toolbar_bg: '#f1f3f6',
    // enable_publishing: false,
    // allow_symbol_change: true,
    // withdateranges: true,
    // range: '1D',
    // hide_side_toolbar: false,
    container: chartRef.current,
    container_id: containerId,
    datafeed: CustomDataFeed as unknown as IBasicDataFeed,
    interval: interval as ResolutionString,
    library_path: "/static/charting_library/",
    // enabled_features: ['show_spread_operators', 'move_logo_to_main_pane'],
    disabled_features: [
      // "volume_force_overlay",
      // "show_logo_on_all_charts",
      // "caption_buttons_text_if_possible",
      // "create_volume_indicator_by_default",
      // "header_compare",
      // "compare_symbol",
      // "display_market_status",
      // "header_interval_dialog_button",
      // "show_interval_dialog_on_key_press",
      // "popup_hints",
      // "header_in_fullscreen_mode",
      // "use_localstorage_for_settings",
      // "right_bar_stays_on_scroll",
      "header_symbol_search",
      "symbol_info",
    ],
    enabled_features: ["hide_price_scale_if_all_sources_hidden"],
    // studies_overrides: {
    //   'bollinger bands.median.color': '#33FF88',
    //   'bollinger bands.upper.linewidth': 7
    // }
  };

  useEffect(() => {
    console.log(window.TradingView);
    if (
      !window.TradingView ||
      typeof window.TradingView.widget !== "function"
    ) {
      console.error("TradingView widget is not available!");
      return;
    }
    chartContainer.current = new window.TradingView.widget(widgetOptions);
    chartContainer.current.onChartReady(() => {
      const widget = chartContainer.current;
      if (!widget) return;

      widget.chart().getSeries().setChartStyleProperties(1, {
        borderColor: "#22c55e",
        upColor: "#22c55e",
        downColor: "#ef4444",
        borderUpColor: "#22c55e",
        borderDownColor: "#ef4444",
      });
      widget.applyOverrides({
        "paneProperties.background": "#101523",
        "paneProperties.backgroundType": "solid",
      });
      const volumeStudy = widget
        .activeChart()
        .getAllStudies()
        .find((x: { name: string }) => x.name === "Volume");
      if (!volumeStudy) return;

      const volumeStudyId = volumeStudy.id;
      const volume = widget.activeChart().getStudyById(volumeStudyId);
      volume.applyOverrides({
        "volume.color.0": "#ef4444",
        "volume.color.1": "#22c55e",
      });
    });

    return () => chartContainer.current?.remove();
  }, []);

  return (
    <ErrorBoundary>
      <div className={clsx("w-full md:h-[600px]", tab === "chart" ? "h-full" : "h-[calc((100vh-116px)/2)]")}>
        <div
          ref={chartRef}
          id={containerId}
          className="tv-chart-container"
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </ErrorBoundary>
  );
};

export default TradingViewChart;
