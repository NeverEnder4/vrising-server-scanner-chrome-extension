import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    common: {
      black: '#01060E',
      white: '#F5F5F5',
    },
    primary: {
      main: '#D90831',
    },
    secondary: {
      main: '#266B88',
      light: '#51C5F4',
    },
    grey: {
      800: '#404751',
    },
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    h1: {
      fontSize: 26,
      fontWeight: 'bold',
      letterSpacing: 1,
      fontFamily: 'Paytone One, sans-serif',
    },
    body1: {
      fontSize: 12,
    },
    body2: {
      fontSize: 12,
      fontWeight: 'bold',
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: { height: 50 },
        indicator: () => ({
          backgroundColor: theme.palette.secondary.light,
          height: 3,
        }),
      },

    },
    MuiTabPanel: {
      styleOverrides: {
        root: () => ({ padding: 0 }),
      },

    },
    MuiTab: {
      styleOverrides: {
        root: () => ({
          color: theme.palette.common.white,
          fontWeight: 'bold',
          '&.Mui-selected': {
            color: theme.palette.secondary.light,
          },
        }),
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          '& input[type=number]': {
            '-moz-appearance': 'textfield',
          },
          '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
          '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },

        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const styles = {
            fontWeight: 'bold',
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
          };

          if (ownerState.color === 'primary' && ownerState.variant === 'contained') {
            styles.backgroundColor = theme.palette.secondary.light;
            styles.color = theme.palette.common.black;
            styles['&:hover'] = { backgroundColor: theme.palette.secondary.light };
          } else if (ownerState.color === 'secondary' && ownerState.variant === 'contained') {
            styles.backgroundColor = theme.palette.common.white;
            styles.color = theme.palette.common.black;
            styles['&:hover'] = { backgroundColor: theme.palette.common.white };
          }

          return styles;
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: theme.palette.common.black,
            '&:hover': {
              backgroundColor: theme.palette.grey[900],
            },
          }),
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const styles = {
          };
          if (
            ownerState.variant === 'body1'
            || ownerState.variant === 'body2'
          ) {
            styles.color = theme.palette.common.white;
          }

          if (ownerState.variant === 'h1') {
            styles.color = theme.palette.primary.main;
          }

          return styles;
        },
      },
    },
  },
});

export default theme;
