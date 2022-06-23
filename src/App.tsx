import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import AppThemeProvider from "./layouts/AppThemeProvider";
import { publicRoutes } from "./routes";

type Props = {};
const theme = {
  textColor: "#fff",
  headerHeight: "120px",
};

const App = (props: Props) => {
  return (
    <AppThemeProvider>
      <Router>
        <GlobalStyles />
        <Routes>
          {publicRoutes.map((route) => {
            const Component = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Component />}
              />
            );
          })}
        </Routes>
      </Router>
    </AppThemeProvider>
  );
};

export default App;
