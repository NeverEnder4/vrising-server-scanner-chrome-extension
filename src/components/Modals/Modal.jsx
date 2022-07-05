import React from 'react';

import { Modal as MuiModal } from '@mui/material';
import PropTypes from 'prop-types';

import { ModalLayout, ModalTabLayout } from './Layouts';

function Modal({
  open,
  handleClose,
  headerConfig,
  children,
  ariaLabeledBy,
  ariaDescribedBy,
}) {
  function getLayout() {
    if (headerConfig.tabs) return ModalTabLayout;
    return ModalLayout;
  }

  const Layout = getLayout();

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby={ariaLabeledBy}
      aria-describedby={ariaDescribedBy}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Layout headerConfig={headerConfig} handleClose={handleClose}>{children}</Layout>
    </MuiModal>
  );
}

Modal.defaultProps = {
  ariaLabeledBy: undefined,
  ariaDescribedBy: undefined,
  children: undefined,
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element,
  ariaLabeledBy: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
  headerConfig: PropTypes.oneOfType([
    PropTypes.shape({
      tabs: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          label: PropTypes.label,
          renderPanel: PropTypes.func,
        }),
      ),
    }),
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.element,
    }),
  ]).isRequired,
};

export default Modal;
