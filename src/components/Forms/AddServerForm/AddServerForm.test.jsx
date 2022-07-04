import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import AddServerForm from './AddServerForm';

describe('AddServerForm component', () => {
  const onSubmitMock = jest.fn();

  it('inputs disabled when form is loading', async () => {
    const { queryAllByRole, queryByDisplayValue } = render(
      <AddServerForm onSubmit={onSubmitMock} loading apiError={null} />,
    );

    const hostIpInput = screen.getByRole('textbox', { name: /Host IP*/i });
    const queryPortInput = screen.getByRole('spinbutton', {
      name: /Query Port*/i,
    });
    const nicknameInput = screen.getByRole('textbox', { name: /Nickname/i });
    const notesInput = screen.getByRole('textbox', { name: /Notes/i });
    const saveButton = screen.getByRole('button', { name: /SAVE/i });

    const HOST_VALUE = '192.22.33.123';
    const PORT_VALUE = '12345';
    const NICKNAME_VALUE = 'Test Server';
    const NOTES_VALUE = 'Test Notes';

    user.type(hostIpInput, HOST_VALUE);
    user.type(queryPortInput, PORT_VALUE);
    user.type(nicknameInput, NICKNAME_VALUE);
    user.type(notesInput, NOTES_VALUE);
    user.click(saveButton);

    await waitFor(() => {
      expect(queryByDisplayValue(HOST_VALUE)).not.toBeInTheDocument();
      expect(queryByDisplayValue(PORT_VALUE)).not.toBeInTheDocument();
      expect(queryByDisplayValue(NICKNAME_VALUE)).not.toBeInTheDocument();
      expect(queryByDisplayValue(NOTES_VALUE)).not.toBeInTheDocument();

      expect(onSubmitMock).not.toHaveBeenCalled();
      expect(queryAllByRole('alert')).toHaveLength(0);
    });
  });
});
