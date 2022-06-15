import React from 'react';

import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

function MaxLengthCount({ maxLength, valueLength }) {
  const theme = useTheme();

  const color = maxLength === valueLength
    ? theme.palette.error.main
    : theme.palette.secondary.light;

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Typography
        variant="body2"
        sx={{ color, letterSpacing: 0.8, marginLeft: 'auto' }}
      >
        {`${valueLength}/${maxLength}`}
      </Typography>
    </Box>
  );
}

MaxLengthCount.propTypes = {
  maxLength: PropTypes.number.isRequired,
  valueLength: PropTypes.number.isRequired,
};

export default MaxLengthCount;
