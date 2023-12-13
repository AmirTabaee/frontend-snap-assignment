import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
        <ToastContainer />
        <App />
    </BrowserRouter>
);
