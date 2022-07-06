import React from 'react';

import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import ModalHeader from './ModalHeader';

// Needs to forward ref because it is the direct child of the MUI Modal component
const ModalLayout = React.forwardRef(
  ({ headerConfig, handleClose, children }, ref) => {
    const { title, renderIcon } = headerConfig;

    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { handleCloseModal: handleClose });
      }
      return child;
    });

    return (
      <Box ref={ref}>
        <ModalHeader
          title={title}
          renderIcon={renderIcon}
          handleClose={handleClose}
        />
        {childrenWithProps}
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
