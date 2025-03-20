import { parseFullSymbol, apiKey } from "./helpers";
import { TradingSymbol, Bar } from "./datafeed";
import socket from "@/socket/token";

const dexSocket = new WebSocket(
  "wss://streamer.cryptocompare.com/v2?api_key=" + apiKey
);
const channelToSubscription = new Map();

dexSocket.addEventListener("open", () => {
  console.log("[dexSocket] Connected");
});

dexSocket.addEventListener("close", (reason) => {
  console.log("[dexSocket] Disconnected:", reason);
});

dexSocket.addEventListener("error", (error) => {
  console.log("[dexSocket] Error:", error);
});

dexSocket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log("[dexSocket] Message:", data);
  const {
    TYPE: eventTypeStr,
    M: exchange,
    FSYM: fromSymbol,
    TSYM: toSymbol,
    TS: tradeTimeStr,
    P: tradePriceStr,
  } = data;

  if (parseInt(eventTypeStr) !== 0) {
    // Skip all non-trading events
    return;
  }
  const tradePrice = parseFloat(tradePriceStr);
  const tradeTime = parseInt(tradeTimeStr);
  const channelString = `0~${exchange}~${fromSymbol}~${toSymbol}`;
  const subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem === undefined) {
    return;
  }
  const lastDailyBar = subscriptionItem.lastDailyBar;
  const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);

  let bar;
  if (tradeTime >= nextDailyBarTime) {
    bar = {
      time: nextDailyBarTime,
      open: tradePrice,
      high: tradePrice,
      low: tradePrice,
      close: tradePrice,
    };
    console.log("[socket] Generate new bar", bar);
  } else {
    bar = {
      ...lastDailyBar,
      high: Math.max(lastDailyBar.high, tradePrice),
      low: Math.min(lastDailyBar.low, tradePrice),
      close: tradePrice,
    };
    console.log("[socket] Update the latest bar by price", tradePrice);
    console.log(bar);
    console.log(subscriptionItem)
  }
  subscriptionItem.lastDailyBar = bar;

  // Send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach(
    (handler: { callback: (bar: Bar) => void }) => handler.callback(bar)
  );
});

socket.on("connect", () => {
  console.log("[presaleSocket] Connected");
});

socket.on(
  "send-transaction",
  ({
    price,
    time,
    symbol,
    volume,
  }: {
    price: number;
    time: string;
    symbol: string;
    volume: number;
  }) => {
    const parsedSymbol = parseFullSymbol(symbol);
    if (!parsedSymbol) {
        return;
    }
    const channelString = `0~${parsedSymbol.exchange.toLowerCase()}~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}`;
    const subscriptionItem = channelToSubscription.get(channelString);
    if (subscriptionItem === undefined) {
      return;
    }
    const lastDailyBar = subscriptionItem.lastDailyBar;
    const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);
    const tradeTime = new Date(time).getTime();
    const tradePrice = price;
    
    let bar;
    if (tradeTime >= nextDailyBarTime) {
      bar = {
        time: nextDailyBarTime,
        open: tradePrice,
        high: tradePrice,
        low: tradePrice,
        close: tradePrice,
        volume: volume,
      };
    } else {
      bar = {
        time: tradeTime,
        open: tradePrice,
        high: tradePrice,
        low: tradePrice,
        close: tradePrice,
        volume: volume,
      };
    }
    subscriptionItem.lastDailyBar = bar;
    // Send data to every subscriber of that symbol
    subscriptionItem.handlers.forEach(
      (handler: { callback: (bar: Bar) => void }) => handler.callback(bar)
    );
  }
);

socket.on("disconnect", () => {
  console.log("[presaleSocket] Disconnected");
});

function getNextDailyBarTime(barTime: number) {
  const date = new Date(barTime * 1000);
  date.setDate(date.getDate() + 1);
  return date.getTime() / 1000;
}

export function subscribeOnStream(
  symbolInfo: TradingSymbol,
  resolution: string,
  onRealtimeCallback: (bar: Bar) => void,
  subscriberUID: string,
  _onResetCacheNeededCallback: () => void,
  lastDailyBar: Bar
) {
    const parsedSymbol = parseFullSymbol(symbolInfo.exchange + ":" + symbolInfo.full_name);
    if (!parsedSymbol) {
        return;
    }
  const channelString = `0~${parsedSymbol.exchange.toLowerCase()}~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}`;
  const handler = {
    id: subscriberUID,
    callback: onRealtimeCallback,
  };
  let subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem) {
    // Already subscribed to the channel, use the existing subscription
    subscriptionItem.handlers.push(handler);
    return;
  }
  subscriptionItem = {
    subscriberUID,
    resolution,
    lastDailyBar,
    handlers: [handler],
  };
  console.log(subscriptionItem);
  channelToSubscription.set(channelString, subscriptionItem);
  console.log(
    "[subscribeBars]: Subscribe to streaming. Channel:",
    channelString
  );
  const subRequest = {
    action: "SubAdd",
    subs: [channelString],
  };
  dexSocket.send(JSON.stringify(subRequest));
}

export function unsubscribeFromStream(subscriberUID: string) {
  // Find a subscription with id === subscriberUID
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString);
    const handlerIndex = subscriptionItem.handlers.findIndex(
      (handler: { id: string }) => handler.id === subscriberUID
    );

    if (handlerIndex !== -1) {
      // Remove from handlers
      subscriptionItem.handlers.splice(handlerIndex, 1);

      if (subscriptionItem.handlers.length === 0) {
        // Unsubscribe from the channel if it was the last handler
        console.log(
          "[unsubscribeBars]: Unsubscribe from streaming. Channel:",
          channelString
        );
        const subRequest = {
          action: "SubRemove",
          subs: [channelString],
        };
        dexSocket.send(JSON.stringify(subRequest));
        channelToSubscription.delete(channelString);
        break;
      }
    }
  }
}
