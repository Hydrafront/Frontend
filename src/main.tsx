import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./styles/dot-loading.css";
import "animate.css/animate.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./utils/config/wagmi-config";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer />
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
