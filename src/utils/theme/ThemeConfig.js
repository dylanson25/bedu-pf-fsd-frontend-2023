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
      },
      palette: {
        mode,
        ...(mode === "light" ? lightPalette : darkPalette),
      },
    })
  );

export default theme;
