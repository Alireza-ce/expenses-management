import { createTheme } from "@material-ui/core";
import { pink, teal } from "@material-ui/core/colors";

export const theme = {
  padding: "4px",
  primaryColor:'#009688',
  primaryDarkColor:'#00695c'

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
