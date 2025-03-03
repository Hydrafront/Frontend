// TradingViewWidget.jsx
import { useEffect, useRef, memo } from 'react';

const TradingViewWidget = memo(function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (scriptRef.current) {
      return; // Script already exists
    }

    const currentContainer = container.current;
    const script = document.createElement("script");
    scriptRef.current = script;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "NASDAQ:AAPL",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com",
      }`;

    if (currentContainer) {
      currentContainer.appendChild(script);
    }

    return () => {
      // Cleanup script on unmount
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
});

export default TradingViewWidget;
