import React from 'react';

import { Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

// Needs to forward ref because it is the direct child of the MUI Modal component
const ModalLayout = React.forwardRef(({ renderHeader, handleClose, children }, ref) => {
  const theme = useTheme();
  const header = renderHeader({ handleClose });

  return (
    <Box ref={ref}>
      <Box sx={{ background: theme.palette.common.black, padding: theme.spacing(2, 3) }}>
        {header}
      </Box>
      {children}
    </Box>
  );
});

ModalLayout.propTypes = {
  renderHeader: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalLayout;
