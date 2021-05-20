import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Work Sans'
    ].join(',')
  },
  light: {
    pink: '#E7007B',
  },
  pink: '#E7007B',
  h1: 'WorkSans-Bold',
  dark: {

  },
  "react-datepicker-ignore-onclickoutside": `
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    `
  ,
  spacing: [0, 4, 8, 16, 32, 64],
  // palette: {
  //   primary: {
  //     main: '#E7007B',
  //   },
  //   secondary: {
  //     main: '#19857b',
  //   },
  //   error: {
  //     main: red.A400,
  //   },
  //   background: {
  //     default: '#fff',
  //   },
  // },
});

export default theme;