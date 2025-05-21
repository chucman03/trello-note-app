import { StrictMode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { createRoot } from "react-dom/client";
import App from "~/App.jsx";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "~/theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmProvider } from "material-ui-confirm";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// browser router
import { BrowserRouter } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
const persistor = persistStore(store)

import { injectStore } from "./utils/authorizeAxios";

injectStore(store)
createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter basename="/">
          <CssVarsProvider theme={theme}>
            <ConfirmProvider>
              <GlobalStyles styles={{ a: {textDecoration: 'none'} }}/>
              <CssBaseline />
              <App />
              <ToastContainer position="top-center" theme="colored" />
            </ConfirmProvider>
          </CssVarsProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  
);
