import { TokenType, TransactionType } from "@/interfaces/types";
import { io } from "socket.io-client";

const socket = io(`${import.meta.env.VITE_SERVER_URL}`, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  path: '/socket.io/',
  autoConnect: true,
  forceNew: true,
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "*"
  }
});

export default socket;

socket.on("connect", () => {
  console.log("connected to socket");
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});

socket.on("disconnect", (reason) => {
  console.log("disconnected from socket:", reason);
});

socket.on("error", (error) => {
  console.error("Socket error:", error);
});

export const createTokenEmit = (token: TokenType) => {
  socket.emit("token-created", token);
};

export const createTokenListener = (func: (token: TokenType) => void) => {
  socket.on("token-created", (token: TokenType) => {
    func(token);
  });
};

export const saveTransactionListener = (
  func: (transaction: TransactionType) => void
) => {
  socket.on("save-transaction", (transaction: TransactionType) => {
    func(transaction);
  });
};

export const updateTokenInfoListener = (
  func: (tokenInfo: TokenType) => void
) => {
  socket.on("update-token-info", (tokenInfo) => {
    func(tokenInfo);
  });
};

export const updateBoostedListener = (func: (boost: number) => void) => {
  socket.on("update-boosted", (boost: number) => {
    func(boost);
  });
};
