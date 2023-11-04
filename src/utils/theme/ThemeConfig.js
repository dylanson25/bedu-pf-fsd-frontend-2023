import { createTheme, responsiveFontSizes } from "@mui/material";
import styleOverrides from "./stylesOverrides";

const lightPalette = {
  primary: {
    main: "#5964E0",
    dark: "#939BF4",
  },
  secondary: {
    main: "rgba(89, 100, 224, 0.1)",
    dark: "rgba(89, 100, 224, 0.35)",
    contrastText: "#5964E0",
  },
  background: {
    default: "#F4F6F8",
  },
};

const darkPalette = {
  primary: {
    main: "#5964E0",
    dark: "#939BF4",
  },
  secondary: {
    main: "rgba(255, 255, 255, .1)",
    dark: "rgba(255, 255, 255, .35)",
    contrastText: "#FFF",
  },
  background: {
    default: "#19202D",
  },
};

const theme = (mode = "light") =>
  responsiveFontSizes(
    createTheme({
      typography: {
        fontFamily: "Kumbh Sans, 'Arial','Brush Script MT'",
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: styleOverrides,
        },
      },
      palette: {
        mode,
        ...(mode === "light" ? lightPalette : darkPalette),
      },
    })
  );

export default theme;
