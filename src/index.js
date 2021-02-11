import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "@fontsource/barlow";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

const theme = {
  colors: {
    primary: "#c6c6c6",
    text: "#232323",
    error: "#b62a2f",
  },
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: Barlow, sans-serif;
    color: ${theme.colors.text};
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
