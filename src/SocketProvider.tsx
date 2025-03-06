import React, { useEffect } from "react";
import { createTokenListener, saveTransactionListener } from "./socket/token";
import { TokenType, TransactionType } from "./interfaces/types";
import { useAppDispatch } from "./store/hooks";
import { addToken, addTransaction } from "./store/reducers/token-slice";

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

    const dispatch = useAppDispatch();

  useEffect(() => {
    createTokenListener((tokenInfo: TokenType) => {
      dispatch(addToken(tokenInfo));
    });
    saveTransactionListener((transaction: TransactionType) => {
      dispatch(addTransaction(transaction));
    });
  }, []);

  return <>{children}</>;
};

export default SocketProvider;
