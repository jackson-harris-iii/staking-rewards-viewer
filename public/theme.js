import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  root: {
    fontFamily: 'Work Sans'
  },
  light: {
    pink: '#E7007B',
  },
  pink: '#E7007B',
  h1: 'WorkSans-Bold',
  "react-datepicker-ignore-onclickoutside": `
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    `
  ,
  spacing: [0, 4, 8, 16, 32, 64],
});

export default theme;