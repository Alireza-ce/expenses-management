import { createTheme } from "@material-ui/core";
import { pink, teal } from "@material-ui/core/colors";

export const theme = {
  fontColour: "purple",
  padding: "4px",
};

export const muiTheme = createTheme({
  palette: {
    primary: teal,
    secondary: pink,
  },
  typography: {
    fontFamily: "Fredoka",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});
