import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./store";

const client = new QueryClient();
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
