import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.tsx";

// Polyfill for Buffer (for Solana wallet support)
import { Buffer } from "buffer";
import { WalletContextProvider } from "./lib/WalletContexProvider.tsx";
import { Toaster } from "sonner";
import store from "./pages/vendor/store/store.tsx";
window.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  <WalletContextProvider>
    <StrictMode>
      <Toaster />
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </WalletContextProvider>
);
