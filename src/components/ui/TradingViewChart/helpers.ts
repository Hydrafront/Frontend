// Your CryptoCompare API key
export const apiKey = "<api-key>";

interface ApiError {
  status: number;
  message?: string;
}

interface TransactionData {
  createdAt: string;
  price: number;
  usd?: number;
}

// Makes requests to CryptoCompare API
export async function makeApiRequest(path: string) {
    try {
        const url = new URL(`https://min-api.cryptocompare.com/${path}`);
        url.searchParams.append('api_key',apiKey)
        const response = await fetch(url.toString());
        return response.json();
    } catch (error: unknown) {
        const apiError = error as ApiError;
        throw new Error(`CryptoCompare request error: ${apiError.status}`);
    }
}

// Generates a symbol ID from a pair of the coins
export function generateSymbol(_exchange: string, fromSymbol: string, toSymbol: string) {
    const short = `${fromSymbol}/${toSymbol}`;
    return {
        short,
    };
}
// Returns all parts of the symbol
export function parseFullSymbol(fullSymbol: string) {
    const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
    if (!match) {
        return null;
    }
    return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
}

export function transformToOHLCV(data: TransactionData[], resolutionInSeconds: number) {
    const ohlcvMap: { [key: number]: { time: number; open: number; high: number; low: number; close: number; volume: number } } = {};
  
    // Group data into intervals
    data.forEach((entry) => {
      const interval = Math.floor((new Date(entry.createdAt).getTime() / 1000) / resolutionInSeconds) * resolutionInSeconds;
  
      if (!ohlcvMap[interval]) {
        ohlcvMap[interval] = {
          time: interval * 1000, // Convert to milliseconds
          open: entry.price,
          high: entry.price,
          low: entry.price,
          close: entry.price,
          volume: entry.usd || 0, // Use `usd` as volume if available
        };
      } else {
        const bucket = ohlcvMap[interval];
        bucket.high = Math.max(bucket.high, entry.price);
        bucket.low = Math.min(bucket.low, entry.price);
        bucket.close = entry.price;
        bucket.volume += entry.usd || 0;
      }
    });
  
     // Convert back to an array and scale prices back to their original range
  return Object.values(ohlcvMap).sort((a, b) => a.time - b.time).map((bar) => ({
    time: bar.time,
    open: bar.open,
    high: bar.high,
    low: bar.low,
    close: bar.close,
    volume: bar.volume,
  }));
  }