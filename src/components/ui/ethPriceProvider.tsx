import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setEthPrice } from "@/store/reducers/eth-slice";
import { getPriceUrl } from "@/utils/config/chainDexConfig";

const EthPriceProvider = ({
  chainId,
  children,
}: {
  chainId: number;
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const priceUrl = getPriceUrl(chainId);

  useEffect(() => {
    if (!priceUrl) return;

    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    let ws: WebSocket | null = null;

    try {
      ws = new WebSocket(priceUrl);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        dispatch(setEthPrice({ [chainId]: parseFloat(data.p).toFixed(4) }));
      };

      ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket closed, reconnecting...");
        setTimeout(() => {
          if (ws) {
            ws = new WebSocket(priceUrl);
          }
        }, 5000);
      };
    } catch (error) {
      console.error("WebSocket initialization error:", error);
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [dispatch, chainId, priceUrl]);

  return <>{children}</>;
};

export default EthPriceProvider;
