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

jest.mock('../../components/Loading/AnimatedLogo', () => {
  function AnimatedLogoMock() {
    return <div>ANIMATED LOGO</div>;
  }

  return AnimatedLogoMock;
});

const NSF_TITLE = 'NO SERVERS FOUND';

describe('Home view', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('No servers saved to chrome storage on render', () => {
    it('does not render any list items', async () => {
      jest.spyOn(chromeStorage, 'getAllServers').mockResolvedValue([]);

      jest.spyOn(chromeStorage, 'set').mockResolvedValue();

      const { queryAllByRole } = render(<Home />);

      await waitFor(() => {
        screen.getByText(NSF_TITLE);
      });

      expect(queryAllByRole('listitem').length).toBe(0);
    });
  });

  describe('Servers saved to chrome storage on render', () => {
    function setupSpies() {
      jest.spyOn(chromeStorage, 'getAllServers').mockResolvedValue([
        {
          nickname: 'My Server',
          ping: 50,
          queryConnect: '111.123.11.1234:98447',
          connect: '111.123.11.1234',
        },
        {
          nickname: 'My Server 2',
          ping: 140,
          queryConnect: '999.993.88.7474:66474',
          connect: '999.993.88.7474',
        },
      ]);

      jest.spyOn(chromeStorage, 'set').mockResolvedValue();
    }
    it('renders server list component with correct amount of items', async () => {
      setupSpies();
      const { getByRole, queryAllByRole } = await render(<Home />);

      await waitFor(() => {
        getByRole('list');
      });

      expect(queryAllByRole('listitem').length).toBe(2);
    });

    it('fetches upated server information when refresh button is clicked', async () => {
      setupSpies();

      jest.spyOn(serverScanner, 'get').mockResolvedValue([
        {
          nickname: 'My Server',
          ping: 50,
          queryConnect: '111.123.11.1234:98447',
          connect: '111.123.11.1234',
        },
        {
          nickname: 'My Server 2',
          ping: 100,
          queryConnect: '999.993.88.7474:66474',
          connect: '999.993.88.7474',
        }]);

      const { getByRole, queryAllByRole, getByText } = await render(<Home />);

      await waitFor(() => {
        getByRole('list');
      });

      user.click(screen.getByRole('button', { name: /Refresh/i }));

      await waitFor(() => {
        getByRole('list');
      });

      expect(queryAllByRole('listitem').length).toBe(2);
      expect(getByText(100)).toBeInTheDocument();
    });
  });

  describe('Add server form user flow', () => {
    const HOST_VALUE = '192.22.33.123';
    const PORT_VALUE = '12345';
    const NICKNAME_VALUE = 'Test Server Name';
    const NOTES_VALUE = 'Test Notes';

    it('validates inputs', async () => {
      jest.spyOn(chromeStorage, 'getAllServers').mockResolvedValue([]);

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
      jest.spyOn(chromeStorage, 'getAllServers').mockResolvedValue([]);
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
      jest.spyOn(chromeStorage, 'getAllServers').mockResolvedValue([]);
      jest.spyOn(chromeStorage, 'getServer').mockResolvedValue(null);
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

    it('submits form, closes modal and adds new server to server list on success', async () => {
      jest
        .spyOn(chromeStorage, 'getAllServers')
        .mockResolvedValueOnce([])
        .mockResolvedValue([
          {
            queryConnect: `${HOST_VALUE}:${PORT_VALUE}`,
            nickname: NICKNAME_VALUE,
            notes: NOTES_VALUE,
            ping: 122,
          },
        ]);
      jest.spyOn(chromeStorage, 'getServer').mockResolvedValue(null);
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
      expect(screen.queryAllByRole('listitem').length).toBe(1);
    });

    it('closes modal when close button is clicked', async () => {
      jest.spyOn(chromeStorage, 'getAllServers').mockResolvedValue([]);

      jest.spyOn(chromeStorage, 'set').mockResolvedValue();

      render(<Home />);

      await waitFor(() => screen.getByText(NSF_TITLE));

      user.click(screen.getByLabelText('Add Server Button'));

      await waitFor(() => screen.queryByRole('presentation'));

      user.click(screen.queryByLabelText(/Close Button/i));

      expect(screen.queryAllByRole('presentation').length).toBe(0);
    });
  });
});
