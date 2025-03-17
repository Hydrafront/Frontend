import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setEthPrice } from "@/store/reducers/eth-slice";

interface PriceEthProviderProps {
  children: React.ReactNode;
  chainId: number;
  priceUrl: string | undefined;
}

const PriceEthProvider: React.FC<PriceEthProviderProps> = ({
  children,
  chainId,
  priceUrl,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!priceUrl || typeof window === "undefined") return;

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
        if (ws) {
          ws = new WebSocket(priceUrl);
        }
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

export default PriceEthProvider;
