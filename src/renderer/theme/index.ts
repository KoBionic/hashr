import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiInput: {
      defaultProps: {
        inputProps: {
          style: {
            paddingTop: 0,
          },
        },
        margin: 'dense',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: 12,
          marginTop: 0.5,
        },
      },
    },
    MuiStepLabel: {
      defaultProps: {
        style: {
          color: 'red',
        },
      },
    },
  },
  palette: {
    background: {
      default: '#21252b',
      paper: '#21252b',
    },
    error: {
      main: '#f44336',
    },
    mode: 'dark',
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#009688',
    },
  },
});

export default theme;
