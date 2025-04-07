import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store  from "./redux/store.js";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
                <App />
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
