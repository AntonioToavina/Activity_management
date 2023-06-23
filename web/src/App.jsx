import "./App.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./assets/theme";
import { Route, Routes } from "react-router-dom";
import { getAllRoutes } from "./routes";

function App() {
  const getRoutes = () => {
    const allRoutes = getAllRoutes();
    return allRoutes.map((route) => {
      if (route.child.length === 0)
        return (
          <Route path={route.route} element={route.component} key={route.key} />
        );
      else {
        return route.child.map((subroute) => {
          return (
            <Route
              path={subroute.route}
              element={subroute.component}
              key={subroute.key}
            />
          );
        });
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>{getRoutes()}</Routes>
    </ThemeProvider>
  );
}

export default App;
