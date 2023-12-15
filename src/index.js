import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.scss";
import App from "./App";
import { ErrorBoundary } from "./components";
import { MainContextProvider } from "./context/MainContextProvider";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
        <ErrorBoundary>
            <ToastContainer />
            <HelmetProvider>
                <MainContextProvider>
                    <App />
                </MainContextProvider>
            </HelmetProvider>
        </ErrorBoundary>
    </BrowserRouter>
);
