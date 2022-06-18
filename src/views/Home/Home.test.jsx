import React from 'react';

import user from '@testing-library/user-event';

import Home from '../../App';
import {
  render, screen, waitFor, waitForElementToBeRemoved,
} from '../../test-utils';
import chromeStorage from '../../utils/chromeStorage';
import serverScanner from '../../utils/serverScanner';

describe('Home view', () => {
  describe('No servers saved to chrome storage', () => {
    it('renders `NoServersFound` component on render', () => {
      const TITLE = 'NO SERVERS FOUND';
      const DESCRIPTION = 'Use the button below to add dedicated V Rising servers.';

      render(
        <Home />,
      );
      expect(screen.getByText(TITLE)).toBeInTheDocument();
      expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
    });
  });

  describe('Add server form user flow', () => {
    const HOST_VALUE = '192.22.33.123';
    const PORT_VALUE = '12345';
    const NICKNAME_VALUE = 'Test Server Name';
    const NOTES_VALUE = 'Test Notes';

    it('validates inputs', async () => {
      render(<Home />);

      user.click(screen.getByLabelText('Add Server Button'));

      await waitFor(() => (
        screen.queryByRole('presentation')
      ));

      user.click(screen.queryByRole('button', { name: /SAVE/i }));

      await waitFor(() => {
        expect(screen.queryAllByRole('alert').length).toBe(2);
      });
    });

    it('validates server already saved to chrome storage', async () => {
      jest.spyOn(chromeStorage, 'getServer').mockImplementation(async () => ({ host: HOST_VALUE }));

      render(<Home />);

      user.click(screen.getByLabelText('Add Server Button'));

      await waitFor(() => (
        screen.queryByRole('presentation')
      ));

      // Type into inputs
      user.type(screen.queryByRole('textbox', { name: /Host IP*/i }), HOST_VALUE);
      user.type(screen.queryByRole('spinbutton', {
        name: /Query Port*/i,
      }), PORT_VALUE);
      user.type(screen.queryByRole('textbox', { name: /Nickname/i }), NICKNAME_VALUE);
      user.type(screen.queryByRole('textbox', { name: /Notes/i }), NOTES_VALUE);

      // Submit form
      user.click(screen.queryByRole('button', { name: /SAVE/i }));

      await waitFor(() => screen.getByRole('alert'));

      expect(screen.queryAllByRole('alert').length).toBe(1);
    });

    it('validates server not found by server scanner API', async () => {
      jest.spyOn(chromeStorage, 'getServer').mockImplementation(async () => (null));
      jest.spyOn(serverScanner, 'get').mockImplementation(async () => ([null]));

      render(<Home />);

      user.click(screen.getByLabelText('Add Server Button'));

      await waitFor(() => (
        screen.queryByRole('presentation')
      ));

      // Type into inputs
      user.type(screen.queryByRole('textbox', { name: /Host IP*/i }), HOST_VALUE);
      user.type(screen.queryByRole('spinbutton', {
        name: /Query Port*/i,
      }), PORT_VALUE);
      user.type(screen.queryByRole('textbox', { name: /Nickname/i }), NICKNAME_VALUE);
      user.type(screen.queryByRole('textbox', { name: /Notes/i }), NOTES_VALUE);

      // Submit form
      user.click(screen.queryByRole('button', { name: /SAVE/i }));

      await waitFor(() => screen.getByRole('alert'));

      expect(screen.queryAllByRole('alert').length).toBe(1);
    });

    it('submits form and closes modal on success', async () => {
      jest.spyOn(chromeStorage, 'getServer').mockImplementation(async () => (null));
      jest.spyOn(serverScanner, 'get').mockImplementation(async () => ([{ host: HOST_VALUE }]));
      jest.spyOn(chromeStorage, 'getAllServers').mockImplementation(async () => ([]));
      jest.spyOn(chromeStorage, 'set').mockImplementation();

      render(<Home />);

      user.click(screen.getByLabelText('Add Server Button'));

      await waitFor(() => (
        screen.queryByRole('presentation')
      ));

      // Type into inputs
      user.type(screen.queryByRole('textbox', { name: /Host IP*/i }), HOST_VALUE);
      user.type(screen.queryByRole('spinbutton', {
        name: /Query Port*/i,
      }), PORT_VALUE);
      user.type(screen.queryByRole('textbox', { name: /Nickname/i }), NICKNAME_VALUE);
      user.type(screen.queryByRole('textbox', { name: /Notes/i }), NOTES_VALUE);

      // Submit form
      user.click(screen.queryByRole('button', { name: /SAVE/i }));

      await waitForElementToBeRemoved(() => screen.getByRole('presentation'));

      expect(screen.queryAllByRole('presentation').length).toBe(0);
    });

    it('closes modal when close button is clicked', async () => {
      render(<Home />);

      user.click(screen.getByLabelText('Add Server Button'));

      await waitFor(() => (
        screen.queryByRole('presentation')
      ));

      user.click(screen.queryByLabelText(/Close Button/i));

      expect(screen.queryAllByRole('presentation').length).toBe(0);
    });
  });
});
