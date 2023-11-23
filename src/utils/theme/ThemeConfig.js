import { createTheme, responsiveFontSizes } from "@mui/material";
import { darkPalette, lightPalette, stylesOverrides } from "./index";

const theme = (mode = "light") =>
  responsiveFontSizes(
    createTheme({
      typography: {
        fontFamily: "Kumbh Sans, 'Arial','Brush Script MT'",
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: stylesOverrides,
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: mode === "light" ? "white" : "#19202D",
            },
          },
        },
      },
      palette: {
        mode,
        ...(mode === "light" ? lightPalette : darkPalette),
      },
    })
  );

export default theme;
