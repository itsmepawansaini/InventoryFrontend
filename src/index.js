import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
// import store from "./redux/root";
import store from "./redux/rtk/app/store";
const root = ReactDOM.createRoot(document.getElementById("root"));

//Setting AXIOS and token
axios.defaults.baseURL = "http://localhost:5000/";
// axios.defaults.baseURL = process.env.REACT_APP_API;

const accessToken = localStorage.getItem("access-token");

axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals();
