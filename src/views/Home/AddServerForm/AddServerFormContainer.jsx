import React, { useState, useCallback } from 'react';

import {
  Box, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';

import LinearProgress from '../../../components/Loading/LinearProgress';
import useServers from '../../../hooks/useServers';
import chromeStorage from '../../../utils/chromeStorage';
import serverScanner from '../../../utils/serverScanner';
import AddServerForm from './AddServerForm';
import AddServerFormHeader from './AddServerFormHeader';

function AddServerFormContainer({ handleCloseModal, titleId }) {
  const theme = useTheme();
  const { loadFromStorage } = useServers();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const onSubmit = useCallback(async (data) => {
    setApiError(null);
    setLoading(true);

    const server = `${data.hostIp}:${data.queryPort}`;

    const alreadySavedServer = await chromeStorage.getServer({ server });

    // If server already exists in storage, set error to let user know
    if (alreadySavedServer) setApiError(`${server} has already been saved to your list.`);
    else {
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
        };
        await chromeStorage.set({ keys: { servers: [...servers, newServer] } });
        handleCloseModal();
      }
    }

    setLoading(false);
    loadFromStorage();
  }, [setApiError, setLoading]);

  return (
    <Box
      sx={{
        padding: theme.spacing(2, 3),
        backgroundColor: theme.palette.grey[800],
        width: 350,
        position: 'relative',
      }}
    >
      <AddServerFormHeader titleId={titleId} closeModal={handleCloseModal} />
      <AddServerForm onSubmit={onSubmit} loading={loading} apiError={apiError} />
      <LinearProgress loading={loading} position="absolute" bottom={0} left={0} width="100%" />
    </Box>
  );
}

AddServerFormContainer.defaultProps = {
  handleCloseModal: undefined,
  titleId: undefined,
};

AddServerFormContainer.propTypes = {
  handleCloseModal: PropTypes.func,
  titleId: PropTypes.string,
};

export default AddServerFormContainer;
