import { TokenType, TransactionType } from "@/interfaces/types";
import { io } from "socket.io-client";

const socket = io(`${import.meta.env.VITE_SERVER_URL}`);

export default socket;

socket.on("connect", () => {
  console.log("connected to socket");
});

socket.on("disconnect", () => {
  console.log("disconnected from socket");
});

export const createTokenEmit = (token: TokenType) => {
  socket.emit("token-created", token);
};

export const createTokenListener = (func: (token: TokenType) => void) => {
  socket.on("token-created", (token: TokenType) => {
    func(token);
  });
};

export const saveTransactionListener = (func: (transaction: TransactionType) => void) => {
  socket.on("save-transaction", (transaction: TransactionType) => {
    console.log("save-transaction", transaction);
    func(transaction);
  });
};