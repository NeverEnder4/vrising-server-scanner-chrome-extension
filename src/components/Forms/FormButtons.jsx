import React from 'react';

import { Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

function FormButtons({ leftButton, rightButton }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: theme.spacing(3),
      }}
    >
      {leftButton}
      {rightButton}
    </Box>
  );
}
FormButtons.defaultProps = {
  leftButton: undefined,
  rightButton: undefined,
};
FormButtons.propTypes = {
  leftButton: PropTypes.element,
  rightButton: PropTypes.element,
};
export default FormButtons;
