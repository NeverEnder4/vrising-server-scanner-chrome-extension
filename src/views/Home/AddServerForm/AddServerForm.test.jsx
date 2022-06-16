import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddServerForm from './AddServerForm';

describe('AddServerForm component', () => {
  const onSubmitMock = jest.fn();

  it('renders correct inputs and save button', () => {
    render(
      <AddServerForm onSubmit={onSubmitMock} loading={false} apiError={null} />,
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
    const { queryAllByRole } = render(
      <AddServerForm onSubmit={onSubmitMock} loading={false} apiError={null} />,
    );

    const saveButton = screen.getByRole('button', { name: /SAVE/i });

    userEvent.click(saveButton);

    await waitFor(() => {
      expect(queryAllByRole('alert')).toHaveLength(2);
    });
  });

  it('submits data', async () => {
    const { queryAllByRole } = render(
      <AddServerForm onSubmit={onSubmitMock} loading={false} apiError={null} />,
    );

    const hostIpInput = screen.getByRole('textbox', { name: /Host IP*/i });
    const queryPortInput = screen.getByRole('spinbutton', {
      name: /Query Port*/i,
    });
    const nicknameInput = screen.getByRole('textbox', { name: /Nickname/i });
    const notesInput = screen.getByRole('textbox', { name: /Notes/i });
    const saveButton = screen.getByRole('button', { name: /SAVE/i });

    userEvent.type(hostIpInput, '192.22.33.123');
    userEvent.type(queryPortInput, '12345');
    userEvent.type(nicknameInput, 'Test Server');
    userEvent.type(notesInput, 'Test Notes');
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
      expect(queryAllByRole('alert')).toHaveLength(0);
    });
  });

  it('displays error returned from api', async () => {
    const API_ERROR = 'Unable to find vrising server';
    const { queryAllByRole } = render(
      <AddServerForm onSubmit={onSubmitMock} loading={false} apiError={API_ERROR} />,
    );

    await waitFor(() => {
      expect(queryAllByRole('alert')).toHaveLength(1);
    });
  });

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

    userEvent.type(hostIpInput, HOST_VALUE);
    userEvent.type(queryPortInput, PORT_VALUE);
    userEvent.type(nicknameInput, NICKNAME_VALUE);
    userEvent.type(notesInput, NOTES_VALUE);
    userEvent.click(saveButton);

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
