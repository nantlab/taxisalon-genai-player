import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#E4E7EB",
      paper: 'rgb(245,247,250)',
    },
    primary: {
      main: "#0091DF",
      light: "#CDF1FF",
    },
    secondary: {
      main: "#CDF1FF",
    },
    text: {
      primary: "#10384F",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgb(0,0,0)",
      paper: "#1E1E1E",
    },
    primary: {
      main: "#FFFFFF",
      light: "#006F9B",
    },
    secondary: {
      main: "#rgb(74,74,74)",
    },
    text: {
      primary: "#E7F8FF",
    },
  },
});

export { lightTheme, darkTheme };
