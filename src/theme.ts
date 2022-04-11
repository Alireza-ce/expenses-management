import { createTheme } from "@material-ui/core";
import { pink } from "@material-ui/core/colors";

export const theme = {
  padding: "4px",
  primaryColor: "#404b58",
  primaryDarkColor: "#fdfefe",
};

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#404b58",
    },
    secondary: pink
  },
  typography: {
    fontFamily: "Fredoka",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});
