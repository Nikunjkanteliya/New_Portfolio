import {
  CssBaseline,
  IconButton,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  GlobalStyles,
} from "@mui/material";
import {
  useMemo,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import { alpha } from "@mui/material/styles";

interface ColorModeContextValue {
  mode: "light" | "dark";
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue | undefined>(
  undefined
);

export function useColorMode() {
  const ctx = useContext(ColorModeContext);
  if (!ctx)
    throw new Error("useColorMode must be used within ColorModeProvider");
  return ctx;
}

export function ColorModeProvider({ children }: PropsWithChildren) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDark ? "dark" : "light"
  );

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () =>
        setMode((prev: "light" | "dark") =>
          prev === "light" ? "dark" : "light"
        ),
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === "light" ? "#1976d2" : "#90caf9" },
          secondary: { main: "#9c27b0" },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#222", // replaces white everywhere
            paper: mode === "light" ? "#f5f5f5" : "#222", // for cards, dialogs, etc.
          },
        },
        typography: {
          fontFamily: [
            "Inter",
            "Roboto",
            "Helvetica",
            "Arial",
            "sans-serif",
          ].join(","),
        },
        shape: { borderRadius: 10 },
        components: {
          MuiButton: { defaultProps: { disableElevation: true } },
          MuiPaper: { defaultProps: { variant: "outlined" } },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={(t) => ({
            html: { scrollBehavior: "smooth" },
            body: { scrollbarGutter: "stable" },
            "*, *::before, *::after": {
              /* Firefox */
              scrollbarWidth: "thin",
              scrollbarColor: `${alpha(t.palette.primary.main, 0.7)} ${
                t.palette.mode === "dark" ? "#2a2a2a" : "#e9e9e9"
              }`,
            },
            /* WebKit */
            "::-webkit-scrollbar": {
              width: 10,
              height: 10,
            },
            "::-webkit-scrollbar-track": {
              backgroundColor:
                t.palette.mode === "dark"
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.05)",
              borderRadius: 999,
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: alpha(t.palette.primary.main, 0.65),
              borderRadius: 999,
              border: `2px solid ${
                t.palette.mode === "dark" ? "rgba(20,20,22,0.9)" : "#fff"
              }`,
            },
            "::-webkit-scrollbar-thumb:hover": {
              backgroundColor: alpha(t.palette.primary.main, 0.85),
            },
            "::-webkit-scrollbar-button": {
              display: "none"
            },
            "::-webkit-scrollbar-corner": { backgroundColor: "transparent" },
          })}
        />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
