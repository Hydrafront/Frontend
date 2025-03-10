import axios from "axios";
import {
  makeApiRequest,
  generateSymbol,
  parseFullSymbol,
  transformToOHLCV,
} from "./helpers";
import { subscribeOnStream, unsubscribeFromStream } from "./streaming";
import { BASE_URL } from "@/store/actions/token.action";

const lastBarsCache = new Map();

const resolutionMap = {
  "1s": {
    resolution: "histominute",
    seconds: 1,
  },
  "1": {
    resolution: "histominute",
    seconds: 60,
  },
  "5": {
    resolution: "histominute",
    seconds: 300,
  },
  "15": {
    resolution: "histominute",
    seconds: 900,
  },
  "60": {
    resolution: "histohour",
    seconds: 3600,
  },
  "240": {
    resolution: "histohour",
    seconds: 14400,
  },
  "1D": {
    resolution: "histoday",
    seconds: 86400,
  },
  "1W": {
    resolution: "histoday",
    seconds: 604800,
  },
  "1M": {
    resolution: "histoday",
    seconds: 2592000,
  },
};

// DatafeedConfiguration implementation
const configurationData = {
  // Represents the resolutions for bars supported by your datafeed
  supported_resolutions: ["1s", "1", "5", "15", "60", "240", "1D", "1W", "1M"],
  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  exchanges: [
    {
      value: "uniswap",
      name: "uniswap",
      desc: "uniswap",
    },
  ],
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  symbols_types: [
    {
      name: "crypto",
      value: "crypto",
    },
  ],
};

export interface TradingSymbol {
  symbol: string;
  full_name: string;
  description: string;
  exchange: string;
  type: string;
}

export interface ExchangeData {
  pairs: {
    [key: string]: string[];
  };
}

export interface ApiResponse {
  Data: {
    [key: string]: ExchangeData;
  };
}

export interface ConfigurationData {
  supported_resolutions: string[];
  exchanges: Array<{ value: string; name: string; desc: string }>;
  symbols_types: Array<{ name: string; value: string }>;
}

export interface Bar {
  time: number;
  low: number;
  high: number;
  open: number;
  close: number;
}

export interface HistoryResponse {
  noData: boolean;
}

// Obtains all symbols for all exchanges supported by CryptoCompare API
async function getAllSymbols(): Promise<TradingSymbol[]> {
  const data = await makeApiRequest("data/v3/all/exchanges") as ApiResponse;
  let allSymbols: TradingSymbol[] = [];

  for (const exchange of configurationData.exchanges) {
    const pairs = data.Data[exchange.value].pairs;

    for (const leftPairPart of Object.keys(pairs)) {
      const symbols = pairs[leftPairPart].map((rightPairPart: string) => {
        const symbol = generateSymbol(
          exchange.value,
          leftPairPart,
          rightPairPart
        );
        return {
          symbol: symbol.short,
          full_name: symbol.short,
          description: symbol.short,
          exchange: exchange.value,
          type: "crypto",
        };
      });
      allSymbols = [...allSymbols, ...symbols];
    }
  }
  return allSymbols;
}

export default {
  onReady: (callback: (configuration: ConfigurationData) => void) => {
    console.log("[onReady]: Method call");
    setTimeout(() => callback(configurationData));
  },

  searchSymbols: async (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResultReadyCallback: (symbols: TradingSymbol[]) => void
  ) => {
    console.log("[searchSymbols]: Method call");
    const symbols = await getAllSymbols();
    const newSymbols = symbols.filter((symbol) => {
      const isExchangeValid = exchange === "" || symbol.exchange === exchange;
      const isFullSymbolContainsInput =
        symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
      return isExchangeValid && isFullSymbolContainsInput;
    });
    onResultReadyCallback(newSymbols);
  },

  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: (symbolInfo: TradingSymbol) => void,
    // onResolveErrorCallback: (error: string) => void,
  ) => {
    console.log("[resolveSymbol]: Method call", symbolName);
    const symbols = await getAllSymbols();
    let symbolItem = symbols.find(
      ({ full_name }) => full_name === symbolName
    );
    // if (!symbolItem) {
    //   console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
    //   onResolveErrorCallback("cannot resolve symbol");
    //   return;
    // }
    if (!symbolItem) {
      symbolItem = {
        full_name: symbolName,
        symbol: symbolName,
        description: symbolName,
        type: "crypto",
        exchange: "Uniswap",
      };
    }
    // Symbol information object
    const symbolInfo = {
      ticker: symbolItem.full_name + "sdf",
      name: symbolItem.symbol,
      description: symbolItem.description,
      type: symbolItem.type,
      session: "24x7",
      timezone: "Etc/UTC",
      exchange: symbolItem.exchange,
      minmov: 1,
      pricescale: 10000000000000,
      has_intraday: true,
      has_no_volume: true,
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      data_status: "streaming",
    };

    console.log("[resolveSymbol]: Symbol resolved", symbolName);
    onSymbolResolvedCallback(symbolInfo as unknown as TradingSymbol);
  },

  getBars: async (
    symbolInfo: TradingSymbol,
    resolution: string,
    from: number,
    to: number,
    onHistoryCallback: (bars: Bar[], response: HistoryResponse) => void,
    onErrorCallback: (error: string) => void
  ) => {
    const resolutionInSeconds = resolutionMap[resolution as keyof typeof resolutionMap];
    if (!resolutionInSeconds) {
      onErrorCallback("unsupported resolution");
      return;
    }
    if (typeof onHistoryCallback !== "function") {
      console.error("[getBars]: onHistoryCallback is not a function!");
      throw new TypeError("onHistoryCallback is not a function");
    }

    console.log("[getBars]: Method call", symbolInfo, resolution);
    const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
    if (!parsedSymbol) {
      onErrorCallback("cannot resolve symbol");
      return;
    }
    // const urlParameters = {
    //   e: parsedSymbol.exchange,
    //   fsym: parsedSymbol.fromSymbol,
    //   tsym: parsedSymbol.toSymbol,
    //   toTs: to,
    //   limit: 2000,
    // };
    // const query = Object.keys(urlParameters)
    //   .map((name) => `${name}=${encodeURIComponent(urlParameters[name as keyof typeof urlParameters])}`)
    //   .join("&");
    try {
      // const data = await makeApiRequest(
      //   `data/${resolutionInSeconds.resolution}?${query}`
      // );
      const response = await axios.get(
        `${BASE_URL}/get-transactions-by-address/${
          window.location.pathname.split("/")[3]
        }`
      );
      const transformedData = transformToOHLCV(
        response.data,
        resolutionInSeconds.seconds
      );
      // const response = await axios.get(`${BASE_URL}/get-transactions-by-address/${window.location.pathname.split("/")[3]}`)
      //   if (
      //   (data.Response && data.Response === "Error") ||
      //   data.Data.length === 0
      // ) {
      //   // "noData" should be set if there is no data in the requested period
      //   onHistoryCallback([], {
      //     noData: true,
      //   });
      //   return;
      // }
      // if ((response.statusText && response.statusText === "error") || response.data.length === 0) {
      //   onHistoryCallback([], {
      //     noData: true,
      //   });
      //   return;
      // }
      let bars: Bar[] = [];
      transformedData.forEach((bar) => {
        bars = [
          ...bars,
          {
            time: bar.time * 1000,
            low: bar.low,
            high: bar.high,
            open: bar.open,
            close: bar.close,
          },
        ];
      });
      lastBarsCache.set(symbolInfo.full_name, {
        ...bars[bars.length - 1],
      });
      console.log(`[getBars]: returned ${bars.length} bar(s)`);
      onHistoryCallback(bars, {
        noData: false,
      });
    } catch (error) {
      console.log("[getBars]: Get error", error);
      onErrorCallback(error as string);
    }
  },

  subscribeBars: (
    symbolInfo: TradingSymbol,
    resolution: string,
    onRealtimeCallback: (bar: Bar) => void,
    subscriberUID: string,
    onResetCacheNeededCallback: () => void
  ) => {
    console.log(
      "[subscribeBars]: Method call with subscriberUID:",
      subscriberUID
    );
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback,
      lastBarsCache.get(symbolInfo.full_name)
    );
  },

  unsubscribeBars: (subscriberUID: string) => {
    console.log(
      "[unsubscribeBars]: Method call with subscriberUID:",
      subscriberUID
    );
    unsubscribeFromStream(subscriberUID);
  },
};
