import {
  LibrarySymbolInfo,
  // ErrorCallback,
  ResolutionString,
} from "./charting_library";

import axios from "axios";
import {
  // makeApiRequest,
  // generateSymbol,
  parseFullSymbol,
  transformToOHLCV,
  TransactionData,
} from "./helpers";
import { subscribeOnStream, unsubscribeFromStream } from "./streaming";
import { BASE_URL } from "@/store/actions/token.action";

const lastBarsCache = new Map();
const cachedBars: { [key: string]: TransactionData[] } = {};

const resolutionMap = {
  "1": {
    resolution: "histominute",
    seconds: 60,
  },
  "3": {
    resolution: "histominute",
    seconds: 180,
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
  supported_resolutions: [
    // "1",
    // "3",
    "5",
    "15",
    "30",
    "60",
    "120",
    "240",
    // "480",
    // "720",
    // "1D",
    // "3D",
    // "1W",
    // "1M",
  ] as ResolutionString[],
  // custom_intervals: {
  //   "1": "1 Min",
  //   "5": "5 Min",
  //   "15": "15 Min",
  //   "60": "1 Hour",
  //   "240": "4 Hours",
  //   "1D": "1 Day",
  //   "1W": "1 Week",
  //   "1M": "1 Month",
  // },
  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  exchanges: [
    {
      value: "uniswap",
      name: "uniswap",
      desc: "uniswap",
    },
  ],
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  // symbols_types: [
  //   {
  //     name: "crypto",
  //     value: "crypto",
  //   },
  // ],
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
}

export interface Bar {
  time: number;
  low: number;
  high: number;
  open: number;
  close: number;
  volume: number;
}

export interface HistoryResponse {
  noData: boolean;
}

// Obtains all symbols for all exchanges supported by CryptoCompare API
// async function getAllSymbols(): Promise<TradingSymbol[]> {
//   try {
//     const data = (await makeApiRequest("data/v3/all/exchanges")) as ApiResponse;
//     let allSymbols: TradingSymbol[] = [];

//     for (const exchange of configurationData.exchanges) {
//       const pairs = data.Data[exchange.value].pairs;

//       for (const leftPairPart of Object.keys(pairs)) {
//         const symbols = pairs[leftPairPart].map((rightPairPart: string) => {
//           const symbol = generateSymbol(
//             exchange.value,
//             leftPairPart,
//             rightPairPart
//           );
//           return {
//             symbol: symbol.short,
//             full_name: symbol.short,
//             description: symbol.short,
//             exchange: exchange.value,
//             type: "crypto",
//           };
//         });
//         allSymbols = [...allSymbols, ...symbols];
//       }
//     }
//     return allSymbols;
//   } catch (error) {
//     console.error("[getAllSymbols]: Get error", error);
//     return [];
//   }
// }

export default {
  onReady: (callback: (configuration: ConfigurationData) => void) => {
    console.log("[onReady]: Method call");
    setTimeout(() => callback(configurationData), 0);
  },

  // searchSymbols: async (
  //   userInput: string,
  //   exchange: string,
  //   symbolType: string,
  //   onResultReadyCallback: (symbols: TradingSymbol[]) => void
  // ) => {
  //   // console.log("[searchSymbols]: Method call");
  //   // const symbols = await getAllSymbols();
  //   // const newSymbols = symbols.filter((symbol) => {
  //   //   const isExchangeValid = exchange === "" || symbol.exchange === exchange;
  //   //   const isFullSymbolContainsInput =
  //   //     symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
  //   //   return isExchangeValid && isFullSymbolContainsInput;
  //   // });
  //   // onResultReadyCallback(newSymbols);
  // },

  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: (symbolInfo: LibrarySymbolInfo) => void,
    // onResolveErrorCallback: ErrorCallback
  ) => {
    console.log("[resolveSymbol]: Method call", symbolName);
    const pricescale = 10000000000000;
    let symbolItem = null;
    // const symbols = await getAllSymbols();
    // symbolItem = symbols.find(({ full_name }) => full_name === symbolName);
    if (!symbolItem) {
      symbolItem = {
        full_name: symbolName,
        symbol: symbolName,
        description: symbolName,
        type: "crypto",
        exchange: "uniswap",
      };
    }

    const symbolInfo: LibrarySymbolInfo = {
      ticker: symbolItem.symbol,
      name: symbolItem.symbol,
      full_name: symbolItem.full_name,
      description: symbolItem.description,
      type: symbolItem.type,
      session: "24x7",
      timezone: "Etc/UTC",
      exchange: symbolItem.exchange,
      listed_exchange: symbolItem.exchange,
      format: "price",
      pricescale,
      minmov: 1,
      has_intraday: true,
      has_daily: false,
      visible_plots_set: "ohlcv",
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      data_status: "streaming",
    };

    console.log("[resolveSymbol]: Symbol resolved", symbolName);
    onSymbolResolvedCallback(symbolInfo);
  },

  getBars: async (
    symbolInfo: TradingSymbol,
    resolution: string,
    periodParams: { from: number; to: number; firstDataRequest: boolean },
    onHistoryCallback: (bars: Bar[], response: HistoryResponse) => void,
    onErrorCallback: (error: string) => void
  ) => {
    const { from, to } = periodParams;

    console.log(periodParams);
    const resolutionInSeconds =
      resolutionMap[resolution as keyof typeof resolutionMap];
    if (!resolutionInSeconds) {
      onErrorCallback("unsupported resolution");
      return;
    }
    if (typeof onHistoryCallback !== "function") {
      console.error("[getBars]: onHistoryCallback is not a function!");
      throw new TypeError("onHistoryCallback is not a function");
    }

    console.log("[getBars]: Method call", symbolInfo, resolution);
    const parsedSymbol = parseFullSymbol(
      `${symbolInfo.exchange}:${symbolInfo.full_name}`
    );
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
      const cachedKey = `${symbolInfo.symbol}_${resolution}`;
      if (!cachedBars[cachedKey]) {
        const response = await axios.get(
          `${BASE_URL}/get-transactions-in-range/${
            window.location.pathname.split("/")[3]
          }/${from}/${to}`
        );
        cachedBars[cachedKey] = response.data.data;
      }
      const transformedData = transformToOHLCV(
        cachedBars[cachedKey].filter((bar) => new Date(bar.createdAt).getTime() >= from * 1000 && new Date(bar.createdAt).getTime() <= to * 1000),
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
            time: bar.time,
            low: bar.low,
            high: bar.high,
            open: bar.open,
            close: bar.close,
            volume: bar.volume,
          },
        ];
      });
      lastBarsCache.set(`${symbolInfo.exchange}:${symbolInfo.full_name}`, {
        ...bars[bars.length - 1],
      });
      onHistoryCallback(bars, {
        noData: bars.length === 0 && new Date(cachedBars[cachedKey][cachedBars[cachedKey].length - 1].createdAt).getTime() > to * 1000,
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
      lastBarsCache.get(`${symbolInfo.exchange}:${symbolInfo.full_name}`)
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
