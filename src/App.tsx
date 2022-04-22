import SpotifyRoute from "./components/router/index";
import HeaderComponent from "./components/header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(249, 211, 180, 1)",
    },
    secondary: {
      main: "#EE2737",
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <header>
          <HeaderComponent />
        </header>
        <main>
          <SpotifyRoute />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
