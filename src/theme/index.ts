import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#21252b',
      paper: '#21252b',
    },
    error: {
      main: '#f44336',
    },
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#009688',
    },
    type: 'dark',
  },
  props: {
    MuiInput: {
      margin: 'dense',
    },
    MuiInputLabel: {
      style: {
        fontSize: 12,
        marginTop: 8,
      },
    },
  },
});

export default theme;
