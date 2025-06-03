import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider, useSelector } from "react-redux";
import store from "./store/store"; // 👈 adjust the path as needed
import "./index.css";
// import { componentKey } from "./SliceForLoader/loaderSlice";
// import Loader from "./commonComponents/loader";
// const isLoading = useSelector((state: any) => state[componentKey]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
