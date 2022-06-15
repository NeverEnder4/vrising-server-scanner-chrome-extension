import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import AddServerFormHeader from './AddServerFormHeader';

describe('AddServerFormHeader component', () => {
  const TITLE_ID = 'Form Title';
  const closeModalMock = jest.fn();

  it('calls `closeModal` when close button is clicked', () => {
    render(
      <AddServerFormHeader
        closeModal={closeModalMock}
        titleId={TITLE_ID}
      />,
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(closeModalMock.mock.calls.length).toBe(1);
  });
});
