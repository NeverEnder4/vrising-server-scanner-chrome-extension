import React, { useState, useCallback } from 'react';

import { Modal } from '@mui/material';
import PropTypes from 'prop-types';

import ModalLayout from '../ModalLayout';

function ButtonModal({
  children,
  renderOpenButton,
  ariaLabeledBy,
  ariaDescribedBy,
  renderHeader,
}) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

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
        <ModalLayout renderHeader={renderHeader} handleClose={handleClose}>
          {children}
        </ModalLayout>
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
  renderHeader: PropTypes.func.isRequired,
};

export default ButtonModal;
