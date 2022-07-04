import React from 'react';

import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import ModalHeader from './ModalHeader';

// Needs to forward ref because it is the direct child of the MUI Modal component
const ModalLayout = React.forwardRef(
  ({ headerConfig, handleClose, children }, ref) => {
    const { title, renderIcon } = headerConfig;

    return (
      <Box ref={ref}>
        <ModalHeader
          title={title}
          renderIcon={renderIcon}
          handleClose={handleClose}
        />
        {children}
      </Box>
    );
  },
);

ModalLayout.propTypes = {
  headerConfig: PropTypes.shape({
    title: PropTypes.string.isRequired,
    renderIcon: PropTypes.func,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalLayout;
