import React, { useState, useCallback, Children } from 'react';

import { Modal, Box } from '@mui/material';
import PropTypes from 'prop-types';

function ButtonModal({
  children,
  renderOpenButton,
  ariaLabeledBy,
  ariaDescribedBy,
}) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { handleCloseModal: handleClose });
    }
    return child;
  });

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={ariaLabeledBy}
        aria-describedby={ariaDescribedBy}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box>{childrenWithProps}</Box>
      </Modal>
      {renderOpenButton({ handleOpenModal: handleOpen })}
    </>
  );
}

ButtonModal.defaultProps = {
  ariaLabeledBy: undefined,
  ariaDescribedBy: undefined,
};

ButtonModal.propTypes = {
  children: PropTypes.element.isRequired,
  renderOpenButton: PropTypes.func.isRequired,
  ariaLabeledBy: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
};

export default ButtonModal;
