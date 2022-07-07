import React, { useState, useCallback } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import { Box, useTheme } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';

import useServers from '../../../../hooks/useServers';
import chromeStorage from '../../../../utils/chromeStorage';
import serverScanner from '../../../../utils/serverScanner';
import LinearProgress from '../../../Loading/LinearProgress';
import TitleWithIcon from '../../../TitleWithIcon';
import AddServerForm from './AddServerForm';

function AddServerFormContainer({ handleCloseModal, title }) {
  const theme = useTheme();
  const { loadFromStorage } = useServers();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const onSubmit = useCallback(
    async (data) => {
      setApiError(null);
      setLoading(true);

      const server = `${data.hostIp}:${data.queryPort}`;

      const alreadySavedServer = await chromeStorage.getServer({ server });

      // If server already exists in storage, set error to let user know
      if (alreadySavedServer) { setApiError(`${server} has already been saved to your list.`); } else {
        const [serverResult] = await serverScanner.get({
          serverList: [server],
        });

        // If server is not found, set error, let user know else save the server
        if (serverResult === null) {
          setApiError(
            'Unable to find server, please make sure the host IP and query port are correct.',
          );
        } else {
          const servers = await chromeStorage.getAllServers();
          const newServer = {
            ...serverResult,
            nickname: data?.nickname,
            notes: data?.notes,
            queryConnect: server,
            lastUpdated: moment().toDate(),
            queryFailed: false,
          };
          await chromeStorage.set({
            keys: { servers: [...servers, newServer] },
          });
          if (typeof handleCloseModal === 'function') handleCloseModal();
        }
      }

      setLoading(false);
      loadFromStorage();
    },
    [setApiError, setLoading],
  );

  const renderIcon = (defaultStyles) => (
    <SettingsIcon sx={{ ...defaultStyles }} />
  );

  return (
    <Box
      sx={{
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(5),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        backgroundColor: theme.palette.grey[800],
        width: 350,
        position: 'relative',
      }}
    >
      {title && <TitleWithIcon title="Settings" renderIcon={renderIcon} />}
      <Box sx={{ paddingTop: title ? theme.spacing(3) : undefined }}>
        <AddServerForm
          onSubmit={onSubmit}
          loading={loading}
          apiError={apiError}
          closeModal={handleCloseModal}
        />
      </Box>
      <LinearProgress
        loading={loading}
        position="absolute"
        bottom={0}
        left={0}
        width="100%"
      />
    </Box>
  );
}

AddServerFormContainer.defaultProps = {
  handleCloseModal: undefined,
  title: false,
};

AddServerFormContainer.propTypes = {
  handleCloseModal: PropTypes.func,
  title: PropTypes.bool,
};

export default AddServerFormContainer;
