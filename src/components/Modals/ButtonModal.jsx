import React, { useState, useCallback } from 'react';

import { Modal } from '@mui/material';
import PropTypes from 'prop-types';

import { ModalLayout, ModalTabLayout } from './Layouts';

function ButtonModal({
  children,
  renderOpenButton,
  ariaLabeledBy,
  ariaDescribedBy,
  headerConfig,
}) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  function getLayout() {
    if (headerConfig.tabs) return ModalTabLayout;
    return ModalLayout;
  }

  const Layout = getLayout();

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
        <Layout headerConfig={headerConfig} handleClose={handleClose}>
          {children}
        </Layout>
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
  headerConfig: PropTypes.oneOfType([
    PropTypes.shape({
      tabs: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          renderPanel: PropTypes.func.isRequired,
        }),
      ),
    }),
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.element,
    }),
  ]).isRequired,
};

export default ButtonModal;
