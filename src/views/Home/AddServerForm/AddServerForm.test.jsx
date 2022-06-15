import React from 'react';

import {
  render, screen, fireEvent, act,
} from '@testing-library/react';

import AddServerForm from './AddServerForm';

describe('AddServerForm component', () => {
  const TITLE_ID = 'Form Title';
  const closeModalMock = jest.fn();

  it('renders correct inputs and save button', () => {
    render(
      <AddServerForm handleCloseModal={closeModalMock} titleId={TITLE_ID} />,
    );

    const hostIpInput = screen.getByRole('textbox', { name: /Host IP*/i });
    expect(hostIpInput).toBeInTheDocument();

    const queryPortInput = screen.getByRole('spinbutton', {
      name: /Query Port*/i,
    });
    expect(queryPortInput).toBeInTheDocument();

    const nicknameInput = screen.getByRole('textbox', { name: /Nickname/i });
    expect(nicknameInput).toBeInTheDocument();

    const notesInput = screen.getByRole('textbox', { name: /Notes/i });
    expect(notesInput).toBeInTheDocument();

    const saveButton = screen.getByRole('button', { name: /SAVE/i });
    expect(saveButton).toBeInTheDocument();
  });

  it('validates form on submit', async () => {
    render(
      <AddServerForm handleCloseModal={closeModalMock} titleId={TITLE_ID} />,
    );

    const saveButton = screen.getByRole('button', { name: /SAVE/i });

    act(() => {
      fireEvent.click(saveButton);
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });

  // Write form submission tests before writing submission function
  // Should test what the user sees on submission
});
