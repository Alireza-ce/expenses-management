import { createTheme } from "@material-ui/core";
import { pink } from "@material-ui/core/colors";

export const theme = {
  padding: "4px",
  primaryColor: "#bc6452", //light orange
  primaryDarkColor: "#272524", //dark
  warnColor:'#f3ead4', //light cream
  lightColor:'#c5b39c'//light brown
};

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#bc6452",
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
