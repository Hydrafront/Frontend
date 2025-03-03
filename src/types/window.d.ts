interface Window {
  ethereum?: {
    request: (
      args:
        | {
            method: "wallet_watchAsset";
            params: {
              type: string;
              options: {
                address: string;
                symbol: string;
                decimals: number;
                image: string;
              };
            };
          }
        | {
            method: "wallet_requestPermissions";
            params: { eth_accounts: object }[];
          }
    ) => Promise<boolean>;
  };
}
