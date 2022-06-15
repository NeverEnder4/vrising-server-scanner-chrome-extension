import { useTheme } from '@mui/material';

function useInputStyles() {
  const theme = useTheme();

  return {
    background: theme.palette.common.black,
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.black}`,
    outline: 'none',
    padding: theme.spacing(1, 1),
    width: '100%',
    marginTop: theme.spacing(1),
  };
}

export default useInputStyles;
