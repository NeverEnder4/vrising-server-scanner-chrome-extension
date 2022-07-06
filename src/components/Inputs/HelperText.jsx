import React from 'react';

import ErrorIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

function HelperText({ helperText, error, formPosition }) {
  const theme = useTheme();
  const ERROR_COLOR = theme.palette.error.main;
  const ICON_SIZE = 12;

  if (!error || !helperText) return null;

  const marginTop = formPosition === 'input' ? 0.5 : 2;

  return (
    <Box
      role="alert"
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: theme.spacing(marginTop),
      }}
    >
      <ErrorIcon
        sx={{
          fill: ERROR_COLOR,
          width: ICON_SIZE,
          height: ICON_SIZE,
          marginRight: theme.spacing(0.5),
          marginTop: theme.spacing(0.25),
        }}
      />
      <Typography variant="body2" sx={{ color: ERROR_COLOR, fontSize: 12 }}>
        {helperText}
      </Typography>
    </Box>
  );
}

HelperText.defaultProps = {
  helperText: '',
  error: false,
  formPosition: 'input',
};

HelperText.propTypes = {
  helperText: PropTypes.string,
  error: PropTypes.bool,
  formPosition: PropTypes.oneOf(['input', 'bottom']),
};

export default HelperText;
