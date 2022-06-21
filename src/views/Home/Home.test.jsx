import React from 'react';

import user from '@testing-library/user-event';

import Home from '../../App';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../test-utils';
import chromeStorage from '../../utils/chromeStorage';
import serverScanner from '../../utils/serverScanner';

describe('Home view', () => {
  const NSF_TITLE = 'NO SERVERS FOUND';

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('No servers saved to chrome storage on render', () => {
    it('renders `NoServersFound` component', async () => {
      jest
        .spyOn(chromeStorage, 'getAllServers')
        .mockResolvedValue([]);

      const { queryAllByRole } = render(<Home />);

      await waitFor(() => {
        screen.getByText(NSF_TITLE);
      });

      expect(queryAllByRole('listitem').length).toBe(0);
    });
  });

  describe('Servers saved to chrome storage on render', () => {
    it('renders server list component', async () => {
      jest
        .spyOn(chromeStorage, 'getAllServers')
        .mockResolvedValue([
          { nickname: 'My Server', ping: 50, queryConnect: '111.123.11.1234:98447' },
          { nickname: 'My Server 2', ping: 140, queryConnect: '999.993.88.7474:66474' },
        ]);

      const { getByRole, queryAllByRole } = await render(<Home />);

      await waitFor(() => {
        getByRole('list');
      });

      expect(queryAllByRole('listitem').length).toBe(2);
    });
  });

  describe('Add server form user flow', () => {
    const HOST_VALUE = '192.22.33.123';
    const PORT_VALUE = '12345';
    const NICKNAME_VALUE = 'Test Server Name';
    const NOTES_VALUE = 'Test Notes';

    jest
      .spyOn(chromeStorage, 'getAllServers')
      .mockResolvedValue([]);

    it('validates inputs', async () => {
      render(<Home />);

      await waitFor(() => {
        screen.getByText(NSF_TITLE);
      });

      user.click(screen.getByLabelText('Add Server Button'));

      await waitFor(() => screen.queryByRole('presentation'));

      user.click(screen.queryByRole('button', { name: /SAVE/i }));

      await waitFor(() => {
        expect(screen.queryAllByRole('alert').length).toBe(2);
      });
    });

    it('validates server already saved to chrome storage', async () => {
      jest
        .spyOn(chromeStorage, 'getAllServers')
        .mockResolvedValue([]);
      jest
        .spyOn(chromeStorage, 'getServer')
        .mockResolvedValue({ host: HOST_VALUE });

      render(<Home />);

      await waitFor(() => {
        screen.getByText(NSF_TITLE);
      });

      user.click(screen.getByLabelText('Add Server Button'));

      await waitFor(() => screen.queryByRole('presentation'));

      // Type into inputs
      user.type(
        screen.queryByRole('textbox', { name: /Host IP*/i }),
        HOST_VALUE,
      );
      user.type(
        screen.queryByRole('spinbutton', {
          name: /Query Port*/i,
        }),
        PORT_VALUE,
      );
      user.type(
        screen.queryByRole('textbox', { name: /Nickname/i }),
        NICKNAME_VALUE,
      );
      user.type(screen.queryByRole('textbox', { name: /Notes/i }), NOTES_VALUE);

      // Submit form
      user.click(screen.queryByRole('button', { name: /SAVE/i }));

      await waitFor(() => screen.getByRole('alert'));

      expect(screen.queryAllByRole('alert').length).toBe(1);
    });

    it('validates server not found by server scanner API', async () => {
      jest
        .spyOn(chromeStorage, 'getAllServers')
        .mockResolvedValue([]);
      jest
        .spyOn(chromeStorage, 'getServer')
        .mockResolvedValue(null);
      jest.spyOn(serverScanner, 'get').mockResolvedValue([null]);

      render(<Home />);

      await waitFor(() => {
        screen.getByText(NSF_TITLE);
      });

      user.click(screen.getByLabelText('Add Server Button'));

      await waitFor(() => screen.queryByRole('presentation'));

      // Type into inputs
      user.type(
        screen.queryByRole('textbox', { name: /Host IP*/i }),
        HOST_VALUE,
      );
      user.type(
        screen.queryByRole('spinbutton', {
          name: /Query Port*/i,
        }),
        PORT_VALUE,
      );
      user.type(
        screen.queryByRole('textbox', { name: /Nickname/i }),
        NICKNAME_VALUE,
      );
      user.type(screen.queryByRole('textbox', { name: /Notes/i }), NOTES_VALUE);

      // Submit form
      user.click(screen.queryByRole('button', { name: /SAVE/i }));

      await waitFor(() => screen.getByRole('alert'));

      expect(screen.queryAllByRole('alert').length).toBe(1);
    });

    it('submits form and closes modal on success', async () => {
      jest
        .spyOn(chromeStorage, 'getAllServers')
        .mockResolvedValue([]);
      jest
        .spyOn(chromeStorage, 'getServer')
        .mockResolvedValue(null);
      jest
        .spyOn(serverScanner, 'get')
        .mockResolvedValue([{ host: HOST_VALUE }]);
      jest.spyOn(chromeStorage, 'set').mockResolvedValue();

      render(<Home />);

      await waitFor(() => {
        screen.getByText(NSF_TITLE);
      });

      user.click(screen.getByLabelText('Add Server Button'));

      await waitFor(() => screen.queryByRole('presentation'));

      // Type into inputs
      user.type(
        screen.queryByRole('textbox', { name: /Host IP*/i }),
        HOST_VALUE,
      );
      user.type(
        screen.queryByRole('spinbutton', {
          name: /Query Port*/i,
        }),
        PORT_VALUE,
      );
      user.type(
        screen.queryByRole('textbox', { name: /Nickname/i }),
        NICKNAME_VALUE,
      );
      user.type(screen.queryByRole('textbox', { name: /Notes/i }), NOTES_VALUE);

      // Submit form
      user.click(screen.queryByRole('button', { name: /SAVE/i }));

      await waitForElementToBeRemoved(() => screen.getByRole('presentation'));

      expect(screen.queryAllByRole('presentation').length).toBe(0);
    });

    it('closes modal when close button is clicked', async () => {
      render(<Home />);

      user.click(screen.getByLabelText('Add Server Button'));

      await waitFor(() => screen.queryByRole('presentation'));

      user.click(screen.queryByLabelText(/Close Button/i));

      expect(screen.queryAllByRole('presentation').length).toBe(0);
    });
  });
});
