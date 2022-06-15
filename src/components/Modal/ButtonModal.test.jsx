import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ButtonModal from './ButtonModal';
import { ButtonModalChildMock, renderOpenButton, testIds } from './testHelpers';

describe('ButtonModal component', () => {
  const MODAL_TITLE = 'Modal Title';
  const MODAL_ROLE = 'presentation';

  it('renders the open button component', () => {
    const { getByTestId, queryByTestId } = render(
      <ButtonModal
        ariaLabeledBy={MODAL_TITLE}
        renderOpenButton={renderOpenButton}
      >
        <ButtonModalChildMock />
      </ButtonModal>,
    );

    expect(getByTestId(testIds.OPEN_BUTTON)).toBeInTheDocument();
    const childComponent = queryByTestId(testIds.CHILD_COMPONENT);
    expect(childComponent).not.toBeInTheDocument();
  });

  it('renders the modal and child components when the open button is clicked', () => {
    const { getByTestId, getByRole } = render(
      <ButtonModal
        ariaLabeledBy={MODAL_TITLE}
        renderOpenButton={renderOpenButton}
      >
        <ButtonModalChildMock />
      </ButtonModal>,
    );

    const openButton = getByTestId(testIds.OPEN_BUTTON);
    fireEvent.click(openButton);
    const childComponent = getByTestId(testIds.CHILD_COMPONENT);
    const modalComponent = getByRole(MODAL_ROLE);

    expect(childComponent).toBeInTheDocument();
    expect(modalComponent).toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', () => {
    const { getByTestId, queryByRole, queryByTestId } = render(
      <ButtonModal
        ariaLabeledBy={MODAL_TITLE}
        renderOpenButton={renderOpenButton}
      >
        <ButtonModalChildMock />
      </ButtonModal>,
    );

    const openButton = getByTestId(testIds.OPEN_BUTTON);
    fireEvent.click(openButton);

    const childComponent = queryByTestId(testIds.CHILD_COMPONENT);
    fireEvent.click(childComponent);

    const modalComponent = queryByRole(MODAL_ROLE);
    expect(childComponent).not.toBeInTheDocument();
    expect(modalComponent).not.toBeInTheDocument();
  });
});
