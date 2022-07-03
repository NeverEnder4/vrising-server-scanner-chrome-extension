import React from 'react';

import PropTypes from 'prop-types';

export const testIds = {
  CHILD_COMPONENT: 'button-modal-child-test',
  OPEN_BUTTON: 'open-button',
};

export function ButtonModalChildMock({ handleCloseModal }) {
  return (
    <button
      data-testid={testIds.CHILD_COMPONENT}
      type="button"
      onClick={handleCloseModal}
    >
      ButtonModalChildMock
    </button>
  );
}

ButtonModalChildMock.defaultProps = {
  handleCloseModal: undefined,
};

ButtonModalChildMock.propTypes = {
  handleCloseModal: PropTypes.func,
};

export const renderOpenButton = ({ handleOpenModal }) => (
  <button
    data-testid={testIds.OPEN_BUTTON}
    type="button"
    onClick={handleOpenModal}
  >
    Open
  </button>
);
