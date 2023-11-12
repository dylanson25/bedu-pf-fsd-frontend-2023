import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, StyledEngineProvider, Container } from "@mui/material";
import theme from "./utils/theme/ThemeConfig";
import "./assets/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme("light")}>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <Container maxWidth="lg">
            <App />
          </Container>
        </StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
