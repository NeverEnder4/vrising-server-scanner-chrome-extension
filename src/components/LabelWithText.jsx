import React from 'react';

import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

function LabelWithText({ label, text }) {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="body2" component="label">
        {label}
      </Typography>
      <Typography color={theme.palette.secondary.light} vairant="body1">
        {text}
      </Typography>
    </Box>
  );
}

LabelWithText.defaultProps = {
  text: '',
};
LabelWithText.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default LabelWithText;
